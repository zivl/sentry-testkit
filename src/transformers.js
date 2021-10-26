'use strict'

function transformReport(report) {
  const exception =
    report.exception && report.exception.values && report.exception.values[0]
  const error = exception
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

function transformTransaction(item) {
  return {
    name: item.transaction,
    traceId: item.contexts.trace.trace_id,
    release: item.release,
    tags: item.tags || {},
    extra: item.extra,
    spans: item.spans.map(span => ({
      id: span.span_id || span.spanId,
      op: span.op,
      parentSpanId: span.parent_span_id || span.parentSpanId,
      description: span.description,
    })),
  }
}

module.exports.transformReport = transformReport
module.exports.transformTransaction = transformTransaction
