import type {
  Breadcrumb,
  Event,
  Severity,
  User,
  Exception,
} from '@sentry/types'

export interface ReportError {
  name: Exception['type']
  message: Exception['value']
  stacktrace: Exception['stacktrace']
}

export interface Report {
  breadcrumbs: Breadcrumb[]
  error?: ReportError
  message?: string
  extra?: { [key: string]: any }
  level: Severity
  release?: string
  user?: User
  tags: { [key: string]: string }
  originalReport: Event
}