import { Event } from '@sentry/types'
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

export function createSentryTransport(testkit: Testkit): any {
  return function() {
    // Send transport for API < v7
    const sendEvent = function(event: Event) {
      if (event.type === 'transaction') {
        testkit.transactions().push(transformTransaction(event))
      } else {
        testkit.reports().push(transformReport(event))
      }

      return Promise.resolve({
        status: 'success',
        event,
      })
    }

    // Send transport for API v7
    const send = function(envelope: any) {
      const [, envelopeItems] = envelope
      const items: [any, any][] = envelopeItems

      // Attachments ride in the same envelope as the event they belong to, so
      // they are collected up front and handed to every report from it
      const attachments: Attachment[] = items
        .filter(([headers]) => headers.type === 'attachment')
        .map(([headers, data]) => transformAttachment(headers, data))
      attachments.forEach(attachment => testkit.attachments().push(attachment))

      items.forEach(([headers, data]) => {
        if (headers.type === 'transaction') {
          testkit.transactions().push(transformTransaction(data))
        } else if (headers.type === 'event') {
          testkit.reports().push(transformReport(data, attachments))
        } else if (headers.type === 'log') {
          // Log items are containers: their payload is { items: SerializedLog[] }
          const logs = (data && data.items) || []
          logs.forEach((log: any) => testkit.logs().push(transformLog(log)))
        } else if (headers.type === 'trace_metric') {
          // Metric items are containers: their payload is { items: SerializedMetric[] }
          const metrics = (data && data.items) || []
          metrics.forEach((metric: any) =>
            testkit.metrics().push(transformMetric(metric))
          )
        } else if (headers.type === 'feedback') {
          testkit.feedback().push(transformFeedback(data))
        } else if (headers.type === 'check_in') {
          testkit.checkIns().push(transformCheckIn(data))
        } else if (headers.type === 'session') {
          testkit.sessions().push(transformSession(data))
        } else if (headers.type === 'sessions') {
          // Aggregate session items batch per-time-bucket counts under `aggregates`
          const aggregates = (data && data.aggregates) || []
          aggregates.forEach((aggregate: any) =>
            testkit
              .sessionAggregates()
              .push(transformSessionAggregate(aggregate, data.attrs))
          )
        }
      })

      return Promise.resolve()
    }

    const close = function() {
      return Promise.resolve(true)
    }

    return {
      // captureEvent(event: SentryEvent): Promise<SentryResponse>;
      captureEvent: sendEvent, // support for v4 API
      sendEvent, // support for v5 API
      send, // support for v7 API

      // close(timeout?: number): Promise<boolean>;
      close,
      flush: close, // support for v7 API
    }
  }
}
