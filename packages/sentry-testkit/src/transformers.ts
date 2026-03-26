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
    spanId: item.contexts.trace.span_id,
    status: item.contexts.trace.status,
    data: item.contexts.trace?.data ?? {},
    op: item.contexts.trace?.op ?? null,
    parentSpanId: item.contexts.trace?.parent_span_id ?? null,
    attributes: item.contexts.trace?.attributes ?? {},
    release: item.release,
    tags: item.tags || {},
    extra: item.extra,
    spans: item.spans,
  }
}
