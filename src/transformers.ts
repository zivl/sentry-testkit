import { Span } from '@sentry/types'
import { Report, ReportError, Transaction } from './types'

export function transformReport(report: any): Report {
  const exception =
    report.exception && report.exception.values && report.exception.values[0]
  const error: ReportError | undefined = exception
    ? {
        name: exception.type,
        message: exception.value,
        stacktrace: exception.stacktrace,
      }
    : undefined

  return {
    breadcrumbs: report.breadcrumbs || [],
    error,
    message: report.message,
    extra: report.extra,
    level: report.level || 'error',
    release: report.release,
    user: report.user,
    tags: report.tags || {},
    originalReport: report,
  }
}

export function transformTransaction(item: any): Transaction {
  return {
    name: item.transaction,
    traceId: item.contexts.trace.trace_id,
    release: item.release,
    tags: item.tags || {},
    extra: item.extra,
    spans: item.spans.map((span: Span) => ({
      // @ts-expect-error
      id: span.span_id || span.spanId,
      op: span.op,
      // @ts-expect-error
      parentSpanId: span.parent_span_id || span.parentSpanId,
      description: span.description,
    })),
  }
}
