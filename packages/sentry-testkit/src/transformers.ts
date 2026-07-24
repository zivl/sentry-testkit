import {
  CheckIn,
  FeedbackReport,
  Log,
  Report,
  ReportError,
  Transaction,
} from './types'

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
    flags: report.contexts?.flags?.values ?? [],
    originalReport: report,
  }
}

export function transformLog(log: any): Log {
  // Serialized log attributes are typed wrappers, e.g. { value: 42, type: 'integer' }
  const attributes: { [key: string]: any } = {}
  Object.keys(log.attributes || {}).forEach(key => {
    const attribute = log.attributes[key]
    attributes[key] =
      attribute && typeof attribute === 'object' && 'value' in attribute
        ? attribute.value
        : attribute
  })

  return {
    level: log.level,
    message: log.body,
    attributes,
    timestamp: log.timestamp,
    traceId: log.trace_id,
    severityNumber: log.severity_number,
    originalLog: log,
  }
}

export function transformFeedback(event: any): FeedbackReport {
  const feedback = event.contexts?.feedback ?? {}
  return {
    message: feedback.message,
    name: feedback.name,
    contactEmail: feedback.contact_email,
    url: feedback.url,
    associatedEventId: feedback.associated_event_id,
    source: feedback.source,
    replayId: feedback.replay_id,
    eventId: event.event_id,
    originalFeedback: event,
  }
}

export function transformCheckIn(checkIn: any): CheckIn {
  return {
    checkInId: checkIn.check_in_id,
    monitorSlug: checkIn.monitor_slug,
    status: checkIn.status,
    duration: checkIn.duration,
    release: checkIn.release,
    environment: checkIn.environment,
    originalCheckIn: checkIn,
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
    user: item.user,
  }
}
