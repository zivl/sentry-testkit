import { fromBytes, toBytes } from './bytes'
import {
  Attachment,
  CheckIn,
  FeedbackReport,
  Log,
  Metric,
  Report,
  ReportError,
  Session,
  SessionAggregate,
  Transaction,
} from './types'

// Serialized attributes are typed wrappers, e.g. { value: 42, type: 'integer' }
function unwrapAttributes(rawAttributes: any): { [key: string]: any } {
  const attributes: { [key: string]: any } = {}
  Object.keys(rawAttributes || {}).forEach(key => {
    const attribute = rawAttributes[key]
    attributes[key] =
      attribute && typeof attribute === 'object' && 'value' in attribute
        ? attribute.value
        : attribute
  })
  return attributes
}

export function transformReport(
  report: any,
  attachments: Attachment[] = []
): Report {
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
    attachments,
    originalReport: report,
  }
}

export function transformAttachment(
  header: any,
  data: string | Uint8Array
): Attachment {
  const bytes = toBytes(data)
  return {
    filename: header.filename,
    contentType: header.content_type,
    attachmentType: header.attachment_type,
    data: bytes,
    text: fromBytes(bytes),
  }
}

export function transformLog(log: any): Log {
  return {
    level: log.level,
    message: log.body,
    attributes: unwrapAttributes(log.attributes),
    timestamp: log.timestamp,
    traceId: log.trace_id,
    severityNumber: log.severity_number,
    originalLog: log,
  }
}

export function transformMetric(metric: any): Metric {
  return {
    name: metric.name,
    type: metric.type,
    value: metric.value,
    unit: metric.unit,
    attributes: unwrapAttributes(metric.attributes),
    timestamp: metric.timestamp,
    traceId: metric.trace_id,
    spanId: metric.span_id,
    originalMetric: metric,
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

export function transformSession(session: any): Session {
  return {
    sid: session.sid,
    status: session.status,
    errors: session.errors ?? 0,
    // Release health attributes are nested under `attrs` on the wire
    release: session.attrs?.release,
    environment: session.attrs?.environment,
    duration: session.duration,
    originalSession: session,
  }
}

export function transformSessionAggregate(
  aggregate: any,
  attrs: any
): SessionAggregate {
  return {
    started: aggregate.started,
    exited: aggregate.exited ?? 0,
    errored: aggregate.errored ?? 0,
    crashed: aggregate.crashed ?? 0,
    abnormal: aggregate.abnormal ?? 0,
    release: attrs?.release,
    environment: attrs?.environment,
    originalAggregate: aggregate,
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
