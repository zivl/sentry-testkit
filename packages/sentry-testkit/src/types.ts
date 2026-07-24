import {
  Event,
  Breadcrumb,
  User,
  SeverityLevel,
  LogSeverityLevel,
  Stacktrace,
  Transport,
  SpanAttributes,
} from '@sentry/core'

export = sentryTestkit

declare function sentryTestkit<
  T extends sentryTestkit.V6TransportClass | sentryTestkit.V7TransportFunction
>(): sentryTestkit.TestkitResult<T>

declare namespace sentryTestkit {
  interface Page {
    on(event: string, handler: (...args: any[]) => any): void
    off(event: string, handler: (...args: any[]) => any): void
  }

  interface ReportError {
    name: string
    message: string
    stacktrace: Stacktrace
  }

  interface ReportFlag {
    flag: string
    result: any
  }

  interface Report {
    breadcrumbs: Breadcrumb[]
    error?: ReportError
    message?: string
    extra?: { [key: string]: any }
    level: SeverityLevel
    release?: string
    user?: User
    tags: { [key: string]: string }
    flags: ReportFlag[]
    originalReport: Event
  }

  interface Span {
    id: string
    span_id: string
    op?: string
    description?: string
    parentSpanId: string
    parent_span_id?: string
    trace_id?: string
  }

  interface Transaction {
    name: string
    traceId: string
    spanId: string
    parentSpanId?: string | null
    data?: Record<string, any>
    status?: string | null
    op?: string | null
    release?: string
    extra?: Record<string, any>
    tags: Record<string, any>
    attributes: SpanAttributes
    spans: Span[]
    user?: User
  }

  interface Log {
    level: LogSeverityLevel
    message: string
    attributes: { [key: string]: any }
    timestamp: number
    traceId?: string
    severityNumber?: number
    originalLog: any
  }

  interface FeedbackReport {
    message: string
    name?: string
    contactEmail?: string
    url?: string
    associatedEventId?: string
    source?: string
    replayId?: string
    eventId?: string
    originalFeedback: any
  }

  type CheckInStatus = 'in_progress' | 'ok' | 'error'

  interface CheckIn {
    checkInId: string
    monitorSlug: string
    status: CheckInStatus
    duration?: number
    release?: string
    environment?: string
    originalCheckIn: any
  }

  interface WaitForOptions {
    timeout?: number
  }

  export interface Testkit {
    puppeteer: {
      startListening(page: Page, baseUrl?: string): void
      stopListening(page: Page): void
    }
    playwright: {
      startListening(page: Page, baseUrl?: string): void
      stopListening(page: Page): void
    }
    reports(): Report[]
    transactions(): Transaction[]
    logs(): Log[]
    feedback(): FeedbackReport[]
    checkIns(): CheckIn[]
    waitForReports(count: number, options?: WaitForOptions): Promise<Report[]>
    waitForTransactions(
      count: number,
      options?: WaitForOptions
    ): Promise<Transaction[]>
    waitForLogs(count: number, options?: WaitForOptions): Promise<Log[]>
    waitForFeedback(
      count: number,
      options?: WaitForOptions
    ): Promise<FeedbackReport[]>
    waitForCheckIns(count: number, options?: WaitForOptions): Promise<CheckIn[]>
    reset(): void
    getExceptionAt(index: number): ReportError | undefined
    findReport(e: Error): Report | undefined
    findReportByMessage(message: string | RegExp): Report | undefined
    findTransaction(name: string | RegExp): Transaction | undefined
    reportsWithTag(key: string, value?: string): Report[]
    transactionsWithTag(key: string, value?: any): Transaction[]
    isExist(e: Error): boolean
  }

  export interface LocalServer {
    start: (dsn: string) => Promise<void>
    stop: () => Promise<void>
    getDsn: () => string
  }

  type V6TransportClass = {
    new (): Transport
  }

  type V7TransportFunction = () => Transport

  export interface TestkitResult<
    Transport extends V6TransportClass | V7TransportFunction
  > {
    testkit: Testkit
    sentryTransport: Transport
    initNetworkInterceptor<T>(
      dsn: string,
      initCallback: (
        baseUrl: string,
        handleRequestBody: (requestBody: { [key: string]: any }) => void
      ) => T
    ): T
    localServer: LocalServer
  }
}
