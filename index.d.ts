import { Event, Exception, Transport, TransportOptions } from '@sentry/types';

export = sentryTestkit;

declare function sentryTestkit(): sentryTestkit.TestkitResult;

declare namespace sentryTestkit {
  interface Page {
    on(event: string, handler: (...args: any[]) => any): void;
    removeListener(event: string, handler: (...args: any[]) => any): void;
  }

  export interface Testkit {
    puppeteer: {
      startListening(page: Page): void;
      stopListening(page: Page): void;
    };
    reports(): Event[];
    reset(): void;
    getExceptionAt(index: number): Exception;
    findReport(e: Error): Event;
    isExist(e: Error): boolean;
  }

  export interface TestkitResult {
    testkit: Testkit;
    sentryTransport: {
      new (options: TransportOptions): Transport;
    };
  }
}
