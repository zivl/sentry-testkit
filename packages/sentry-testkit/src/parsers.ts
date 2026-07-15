import {
  transformLog,
  transformReport,
  transformTransaction,
} from './transformers'
import { Testkit } from './types'

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
}

const NEWLINE = 0x0a

// Buffer in Node.js, TextEncoder/TextDecoder in browsers (Puppeteer page context)
function toBytes(input: string | Uint8Array): Uint8Array {
  if (typeof input !== 'string') {
    return input
  }
  return typeof Buffer !== 'undefined'
    ? Buffer.from(input)
    : new TextEncoder().encode(input)
}

function fromBytes(bytes: Uint8Array): string {
  return typeof Buffer !== 'undefined'
    ? Buffer.from(bytes).toString()
    : new TextDecoder().decode(bytes)
}

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

    let rawPayload: string
    if (typeof header.length === 'number') {
      rawPayload = fromBytes(bytes.subarray(next, next + header.length))
      offset = next + header.length
      // Skip the newline separating this payload from the next item header
      if (bytes[offset] === NEWLINE) {
        offset++
      }
    } else {
      const payloadLine = readLine(next)
      rawPayload = payloadLine.line
      offset = payloadLine.next
    }

    let payload: any
    try {
      payload = JSON.parse(rawPayload)
    } catch {
      // Non-JSON payloads (e.g. attachments, replay recordings) stay raw
      payload = rawPayload
    }

    items.push({ header, payload })
  }

  return items
}

export function handleEnvelopeRequestData(
  requestBody: any,
  testkit: Testkit
): void {
  parseEnvelope(requestBody).forEach(({ header, payload }) => {
    if (header.type === 'transaction') {
      testkit.transactions().push(transformTransaction(payload))
    } else if (header.type === 'event') {
      testkit.reports().push(transformReport(payload))
    } else if (header.type === 'log') {
      // Log items are containers: their payload is { items: SerializedLog[] }
      const logs = (payload && payload.items) || []
      logs.forEach((log: any) => testkit.logs().push(transformLog(log)))
    }
  })
}
