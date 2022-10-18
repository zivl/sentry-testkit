---
sidebar_position: 1
---
# Type Definitions

### `ReportError`
Represents a report error object. The object has the following keys:

```typescript
  interface ReportError {
    // The error name
    name: string
    //The error message
    message: string
    // The error stacktrace as individual frames
    stacktrace: StackFrame[]
  }
```
**See:** [StackFrame](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/stackframe.ts)

### `Report`

Represents a report event.

```typescript
  interface Report {
    // An array of Breadcrumb objects
    breadcrumbs: Breadcrumb[] = []
    // An error object. The error will be defined when using `Sentry.captureException`
    error?: ReportError
    // The message key will be defined when using `Sentry.captureMessage`.
    message?: string
    // The extra context provided by `scope.setExtra`.
    extra?: { [key: string]: any }
    // The level of the report provided by `scope.setLevel`.
    level: SeverityLevel = SeverityLevel.Error
    // The release string provided by `scope.setRelease`.
    release?: string
    // The user provided by `scope.setUser`.
    user?: User
    // The tags provided by `scope.setTag`.
    tags: { [key: string]: string } = {}
    // Sentry's original report object.
    originalReport: Event
  }
```

The tags provided by `scope.setTag`.
**See:**
[`Breadcrumb`](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/breadcrumb.ts)
[`ReportError`](#reporterror)
[Severity](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/severity.ts)
[User](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/user.ts)
[SentryEvent](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/event.ts)

### `Transaction`

Represents a transaction event.
```typescript
  interface Transaction {
    // The `name` field of the transaction.
    name: string
    // The id of the trace the transaction is associated with.
    traceId: string
    // The release string provided by `scope.setRelease`.
    release?: string
    // The extra context provided by `scope.setExtra`.
    extra?: Record<string, unknown>
    // The tags provided by `scope.setTag`.
    tags: Record<string, unknown> = {}
    // An array of child `Span` objects for this transaction
    spans: Span[] = []
  }
```

### `Span`
Represents a child span event of a specific transaction.

```typescript
  interface Span {
    // The `id` field of the reported span.
    id: string
    // The `op` field of the reported span.
    op?: string = 'default'
    // The `description` field of the reported span.
    description?: string
    // The id of the parent transaction.
    parentSpanId: string
  }
```
