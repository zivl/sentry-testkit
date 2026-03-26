# Span IDs

## Overview

Starting from version 6.1.0, sentry-testkit provides support for `spanId` and `parentSpanId` properties in your Sentry reports. These IDs are essential for performance monitoring and distributed tracing, allowing you to track the relationships between various spans and transactions in your application.

## What are Span IDs?

In the context of distributed tracing:

- **spanId**: A unique identifier for a specific operation or unit of work within your application. Each span represents a single operation, such as a function call or a database query.

- **parentSpanId**: A reference to the parent span that initiated the current operation. This creates a hierarchical relationship between spans, allowing you to understand the full context of operations.

## Accessing Span IDs in Tests

You can access these properties in your test assertions:

```javascript
const sentryTestkit = require('sentry-testkit')
const { testkit } = sentryTestkit()

// After your code triggers a Sentry event
const reports = testkit.reports()
const lastReport = reports[reports.length - 1]

// Access span IDs
console.log(lastReport.spanId) // Unique identifier for this span
console.log(lastReport.parentSpanId) // Reference to parent span (if exists)
```

## Example Use Case: Testing Trace Relationships

You can use these IDs to verify that your application correctly creates parent-child relationships between operations:

```javascript
test('should create child spans with correct parent references', async () => {
  // Trigger a parent operation that creates child spans
  await performParentOperationWithChildren()

  const reports = testkit.reports()

  // Find the parent span
  const parentReport = reports.find(r => r.transaction === 'parentOperation')

  // Verify child spans reference the parent
  const childReports = reports.filter(
    r => r.parentSpanId === parentReport.spanId
  )

  expect(childReports.length).toBeGreaterThan(0)
  expect(childReports[0].transaction).toBe('childOperation')
})
```

## Integration with Transactions

Span IDs work seamlessly with Sentry's transaction API. When working with performance monitoring:

```javascript
const transaction = Sentry.startTransaction({ name: 'My Transaction' })
Sentry.configureScope(scope => scope.setSpan(transaction))

// Later in your tests
expect(testkit.transactions()[0].spanId).toBeDefined()
```

This feature enhancement makes it easier to test distributed tracing functionality in your applications while using sentry-testkit.
