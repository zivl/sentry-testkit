import { Event, Breadcrumb, User, Severity, StackFrame, Transport, TransportOptions } from '@sentry/types';

export = sentryTestkit;

declare function sentryTestkit(): sentryTestkit.TestkitResult;

declare namespace sentryTestkit {
  interface Page {
    on(event: string, handler: (...args: any[]) => any): void;
    removeListener(event: string, handler: (...args: any[]) => any): void;
  }

  interface ReportError {
    name: string
    message: string
    stacktrace: StackFrame[]
  }

  interface Report {
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

  export interface Testkit {
    puppeteer: {
      startListening(page: Page): void;
      stopListening(page: Page): void;
    };
    reports(): Report[];
    reset(): void;
    getExceptionAt(index: number): ReportError;
    findReport(e: Error): Report;
    isExist(e: Error): boolean;
  }

  export interface LocalServer {
    start: (dsn: string) => Promise<void>;
    stop: () => Promise<void>;
    getDsn: () => string;
  }

  export interface TestkitResult {
    testkit: Testkit;
    sentryTransport: {
      new (options: TransportOptions): Transport;
    };
    initNetworkInterceptor<T>(dsn: string, initCallback: (baseUrl: string, handleRequestBody: (requestBody: { [key: string]: any }) => void) => T): T;
    localServer: LocalServer
  }
}
