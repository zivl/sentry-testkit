import { Report, Transaction } from './types'
import { Event, Severity } from '@sentry/browser'

export function getException(report?: Report) {
  if (!report) {
    return
  }

  return report.error
}

export function parsePerfRequest(reqBody?: string) {
  const perfRequestDetails = reqBody?.split('\n')[2]
  if (!reqBody || !perfRequestDetails) {
    return
  }

  return JSON.parse(perfRequestDetails)
}

export function transformReport(event: Event): Report {
  const exception = event.exception?.values?.[0]

  const error = exception
    ? {
        name: exception.type,
        message: exception.value,
        stacktrace: exception.stacktrace,
      }
    : undefined

  return {
    breadcrumbs: event.breadcrumbs || [],
    error,
    message: event.message,
    extra: event.extra,
    level: event.level || Severity.Error,
    release: event.release,
    user: event.user,
    tags: event.tags || {},
    originalReport: event,
  }
}

export function transformTransaction(item: Event): Transaction {
  return {
    name: item.transaction,
    // @ts-ignore
    traceId: item.contexts?.trace?.trace_id,
    release: item.release,
    tags: item.tags || {},
    extra: item.extra,
    spans: item?.spans?.map((span) => ({
      // @ts-ignore
      id: span.span_id || span.spanId,
      op: span.op,
      // @ts-ignore
      parentSpanId: span.parent_span_id || span.parentSpanId,
      description: span.description,
    })),
  }
}
