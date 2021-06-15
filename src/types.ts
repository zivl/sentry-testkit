import type { Event, Exception, Span } from '@sentry/types'

export interface ReportError {
  name: Exception['type']
  message: Exception['value']
  stacktrace: Exception['stacktrace']
}

export interface Report {
  error?: ReportError
  originalReport?: Event
  breadcrumbs?: Event['breadcrumbs']
  message?: Event['message']
  extra?: Event['extra']
  level: Event['level']
  release?: Event['release']
  user?: Event['user']
  tags?: Event['tags']
}

export interface TransactionSpan {
  id: Span['spanId']
  op: Span['op']
  parentSpanId: Span['parentSpanId']
  description: Span['description']
}
export interface Transaction {
  name: Event['transaction']
  release: Event['release']
  tags: Event['tags']
  extra: Event['extra']
  traceId?: string
  spans?: TransactionSpan[]
}
