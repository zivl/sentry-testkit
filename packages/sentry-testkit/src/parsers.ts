import { fromBytes, toBytes } from './bytes'
import {
  transformAttachment,
  transformCheckIn,
  transformFeedback,
  transformLog,
  transformMetric,
  transformReport,
  transformSession,
  transformSessionAggregate,
  transformTransaction,
} from './transformers'
import { Attachment, Testkit } from './types'

const dsnKeys = 'source protocol user pass host port path'.split(' ')
const dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/ //eslint-disable-line no-useless-escape

export function parseDsn(dsn: string) {
  const dsnMatch = dsn.match(dsnPattern)
  if (!dsnMatch) {
    throw new Error('Could not parse DSN')
  }
  const { protocol, host, path } = dsnMatch.reduce<{
    protocol: string
    host: string
    path: string
  }>(
    (parsed, current, index) =>
      Object.assign({}, parsed, {
        [dsnKeys[index] as string]: current,
      }),
    {} as { protocol: string; host: string; path: string }
  )

  const project = path.substr(path.lastIndexOf('/') + 1)

  return { protocol, project, host }
}

export interface EnvelopeItemHeader {
  type?: string
  length?: number
  [key: string]: any
}

export interface EnvelopeItem {
  header: EnvelopeItemHeader
  payload: any
  // The undecoded payload, which attachments need to survive binary data
  payloadBytes: Uint8Array
}

const NEWLINE = 0x0a

// Envelope format: https://develop.sentry.dev/sdk/data-model/envelopes/
// <envelope header>\n(<item header>\n<item payload>\n)*
// An item header may declare `length` (payload size in bytes), in which case
// the payload may contain newlines or binary data.
export function parseEnvelope(rawBody: string | Uint8Array): EnvelopeItem[] {
  const bytes = toBytes(rawBody)
  const items: EnvelopeItem[] = []

  const readLine = (from: number) => {
    let end = from
    while (end < bytes.length && bytes[end] !== NEWLINE) {
      end++
    }
    return {
      line: fromBytes(bytes.subarray(from, end)),
      next: end + 1,
    }
  }

  // Skip the envelope header line
  let offset = readLine(0).next

  while (offset < bytes.length) {
    const { line: headerLine, next } = readLine(offset)
    if (headerLine.trim() === '') {
      // Tolerate trailing newlines at the end of the envelope
      offset = next
      continue
    }
    const header = JSON.parse(headerLine)

    let payloadBytes: Uint8Array
    if (typeof header.length === 'number') {
      payloadBytes = bytes.subarray(next, next + header.length)
      offset = next + header.length
      // Skip the newline separating this payload from the next item header
      if (bytes[offset] === NEWLINE) {
        offset++
      }
    } else {
      const payloadLine = readLine(next)
      payloadBytes = bytes.subarray(next, payloadLine.next - 1)
      offset = payloadLine.next
    }

    const rawPayload = fromBytes(payloadBytes)
    let payload: any
    try {
      payload = JSON.parse(rawPayload)
    } catch {
      // Non-JSON payloads (e.g. attachments, replay recordings) stay raw
      payload = rawPayload
    }

    items.push({ header, payload, payloadBytes })
  }

  return items
}

export function handleEnvelopeRequestData(
  requestBody: any,
  testkit: Testkit
): void {
  const items = parseEnvelope(requestBody)

  // Attachments ride in the same envelope as the event they belong to, so they
  // are collected up front and handed to every report from this envelope
  const attachments: Attachment[] = items
    .filter(({ header }) => header.type === 'attachment')
    .map(({ header, payloadBytes }) =>
      transformAttachment(header, payloadBytes)
    )
  attachments.forEach(attachment => testkit.attachments().push(attachment))

  items.forEach(({ header, payload }) => {
    if (header.type === 'transaction') {
      testkit.transactions().push(transformTransaction(payload))
    } else if (header.type === 'event') {
      testkit.reports().push(transformReport(payload, attachments))
    } else if (header.type === 'log') {
      // Log items are containers: their payload is { items: SerializedLog[] }
      const logs = (payload && payload.items) || []
      logs.forEach((log: any) => testkit.logs().push(transformLog(log)))
    } else if (header.type === 'trace_metric') {
      // Metric items are containers: their payload is { items: SerializedMetric[] }
      const metrics = (payload && payload.items) || []
      metrics.forEach((metric: any) =>
        testkit.metrics().push(transformMetric(metric))
      )
    } else if (header.type === 'feedback') {
      testkit.feedback().push(transformFeedback(payload))
    } else if (header.type === 'check_in') {
      testkit.checkIns().push(transformCheckIn(payload))
    } else if (header.type === 'session') {
      testkit.sessions().push(transformSession(payload))
    } else if (header.type === 'sessions') {
      // Aggregate session items batch per-time-bucket counts under `aggregates`
      const aggregates = (payload && payload.aggregates) || []
      aggregates.forEach((aggregate: any) =>
        testkit
          .sessionAggregates()
          .push(transformSessionAggregate(aggregate, payload.attrs))
      )
    }
  })
}
