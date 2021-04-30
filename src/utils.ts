import { Report } from './types'
import { Event, Severity } from '@sentry/browser'

export function getException(report?: Report) {
  if (!report) {
    return
  }

  return report.error
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
