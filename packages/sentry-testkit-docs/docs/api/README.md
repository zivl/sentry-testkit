---
title: API Reference
description: Sentry Testkit API Reference documentation.
sidebar_position: 2
---

# API Reference
Sentry Testkit consists of a very simple and strait-forward API using the following functions

## Methods

**Capture and assertions**
* [`reports()`](#reports) — captured errors and messages
* [`transactions()`](#transactions) — captured performance transactions
* [`logs()`](#logs) — captured structured logs
* [`feedback()`](#feedback) — captured user feedback
* [`checkIns()`](#checkins) — captured cron monitor check-ins

**Awaiting asynchronously-sent data**
* [`waitForReports(count, options)`](#waitforreportscount-options) — and its siblings `waitForTransactions`, `waitForLogs`, `waitForFeedback`, `waitForCheckIns`

**Finding and filtering**
* [`findReport(error)`](#findreporterror)
* [`findReportByMessage(message)`](#findreportbymessagemessage)
* [`findTransaction(name)`](#findtransactionname)
* [`reportsWithTag(key, value)`](#reportswithtagkey-value) — and `transactionsWithTag(key, value)`
* [`isExist(error)`](#isexisterror)
* [`getExceptionAt(index)`](#getexceptionatindex)

**Utilities**
* [`reset()`](#reset)

### What About Nodejs? - Of Course!
Sentry Testkit has full support in both `@sentry/browser` and `@sentry/node` (as well as other `@sentry/<what-ever>` clients) since they have the same API and lifecycle under the hood.

:::note Raven-Testkit
The good old legacy `raven-testkit` documentation can be found [here](/docs/raven-testkit-legacy). It it still there to serve `Raven` which is the old legacy SDK of *Sentry* for JavaScript/Node.js platforms
:::

## Reference
### `reports()`
Gets all existing reports.

**Returns**: <code>Array</code> - where each member of the array consists of *Sentry's* <code>Report</code> type.

**See**: You may refer to the definition of [<code>Report</code>](./api/types#report) for further explanation and details.

For example
```javascript
const waitForExpect = require('wait-for-expect')

test('reports example', async function() {
    // Some scenario that will report the exceptions...

    await waitForExpect(() => expect(testkit.reports().length).toBeGreaterThan(0))
    const reports = testkit.reports()

    // Do what ever you want with the reports list
})
```
:::info
Here we use [`wait-for-expect`](https://www.npmjs.com/package/wait-for-expect) library to emphasize that sometimes we need to **wait** until the report is being sent as it is done asynchronously. You can also use the built-in [`waitForReports`](#waitforreportscount-options) helper instead.
:::

Each report also exposes evaluated [feature flags](https://docs.sentry.io/platforms/javascript/feature-flags/) as `report.flags` — an array of `{ flag, result }` objects taken from the event's `contexts.flags`, or an empty array when no flags were attached:

```javascript
expect(testkit.reports()[0].flags).toEqual([{ flag: 'new-checkout', result: true }])
```

### `waitForReports(count, options)`
Waits until at least `count` reports have been captured. This replaces "sleep then assert" patterns and third-party polling helpers — Sentry transports are asynchronous, so reports may not be captured yet when your assertion runs.

**Arguments**
* count: `Number` - the minimum number of reports to wait for
* options: `Object` *(optional)* - `{ timeout: Number }`, defaults to `{ timeout: 1000 }` (milliseconds)

**Returns**: <code>Promise&lt;Array&gt;</code> - resolves with the captured reports once the count is reached; rejects with a descriptive error if the timeout elapses first.

For example
```javascript
test('waitForReports example', async function() {
    Sentry.captureException(new Error('sentry test kit is awesome!'))

    const reports = await testkit.waitForReports(1)
    expect(reports[0].error.message).toEqual('sentry test kit is awesome!')
})
```

Sibling helpers with the same signature exist for the other captured types: `waitForTransactions(count, options)` and `waitForLogs(count, options)`.

### `findReport(error)`
Finds a report by a given error.

Uses [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) under the hood

**Arguments**
* error: `Error` - An error object to look for in the reports

**Returns**: <code>Report</code> \| <code>undefined</code> - the report object if one found. `undefined` otherwise.

**See**: You may refer to the definition of [<code>Report</code>](./api/types#report) for further explanation and details.

For example
```javascript
test('findReport example', async function() {
    const err = new Error('error to look for')

    // Some faulty scenario that will report err

    const report = testkit.findReport(err)
    expect(report).toBeDefined()
})
```

### `findReportByMessage(message)`
Finds a report by its message — either a `captureMessage` message or a captured error's message.

**Arguments**
* message: `String` | `RegExp` - exact message to match, or a regular expression to test against

**Returns**: <code>Report</code> \| <code>undefined</code> - the first matching report. `undefined` otherwise.

For example
```javascript
test('findReportByMessage example', async function() {
    Sentry.captureException(new Error('failed to fetch user 42'))
    await testkit.waitForReports(1)

    expect(testkit.findReportByMessage(/user \d+/)).toBeDefined()
})
```

### `findTransaction(name)`
Finds a transaction by its name.

**Arguments**
* name: `String` | `RegExp` - exact transaction name to match, or a regular expression to test against

**Returns**: <code>Transaction</code> \| <code>undefined</code> - the first matching transaction. `undefined` otherwise.

For example
```javascript
test('findTransaction example', async function() {
    Sentry.startInactiveSpan({ op: 'transaction', name: 'checkout-flow' }).end()
    await testkit.waitForTransactions(1)

    expect(testkit.findTransaction(/^checkout/)).toBeDefined()
})
```

### `reportsWithTag(key, value)`
Gets all reports carrying a given tag, optionally with a specific value.

**Arguments**
* key: `String` - the tag key to look for
* value: `String` *(optional)* - when provided, only reports whose tag equals this value are returned

**Returns**: <code>Array</code> - the matching reports (empty array when none match).

For example
```javascript
test('reportsWithTag example', async function() {
    Sentry.withScope(scope => {
        scope.setTag('section', 'billing')
        Sentry.captureException(new Error('tagged error'))
    })
    await testkit.waitForReports(1)

    expect(testkit.reportsWithTag('section', 'billing')).toHaveLength(1)
})
```

A sibling helper with the same signature exists for transactions: `transactionsWithTag(key, value)`.

### `isExist(error)`
Checks whether a given error exist (i.e. has been reported)

**Arguments**<br />
* error: `Error` - An error object to look for in the reports

**Returns**: `Boolean` - `true` if the error exists. `false` otherwise.

For example
```javascript
 test('isExist example', async function() {
    const err = new Error('error to look for')
    Sentry.captureException(err)
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.isExist(err)).toBe(true)
})
```

### `getExceptionAt(index)`
Extracts the exception object of a report in a specific position.

**Arguments**<br/>
* index : `Number` - index position of the report.

**Returns**: `ReportError`.

**See**: You may refer to the definition of [<code>ReportError</code>](./api/types#reporterror) for further explanation and details.

For example
```javascript
test('getExceptionAt example', async function() {
    Sentry.captureException(new Error('testing get exception at index 0'))
    Sentry.captureException(new Error('testing get exception at index 1'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(2))
    const { message } = testkit.getExceptionAt(1)
    expect(message).toEqual('testing get exception at index 1')
})
```

### `transactions()`
Gets all existing transactions.

**Returns**: <code>Array</code> - where each member of the array consists of a <code>Transaction</code> type.

**See**: You may refer to the definition of [<code>Transaction</code>](./api/types#transaction) for further explanation and details.

For example
```javascript
test('transactions example', async function() {
    // Some scenario that will create a transaction...

    await waitForExpect(() => expect(testkit.transactions().length).toBeGreaterThan(0))
    const transactions = testkit.transactions()

    // Do what ever you want with the transactions
})
```

### `logs()`
Gets all captured [structured logs](https://docs.sentry.io/platforms/javascript/logs/) (requires `enableLogs: true` in `Sentry.init`).

**Returns**: <code>Array</code> - where each member of the array consists of a <code>Log</code> type:

| Field | Type | Description |
|-------|------|-------------|
| `level` | <code>string</code> | `trace` \| `debug` \| `info` \| `warn` \| `error` \| `fatal` |
| `message` | <code>string</code> | The log body |
| `attributes` | <code>Object</code> | Log attributes as plain values, e.g. `{ userId: 42 }` |
| `timestamp` | <code>number</code> | Epoch time in seconds |
| `traceId` | <code>string</code> | The trace this log belongs to, if any |
| `severityNumber` | <code>number</code> | The numeric severity, if any |
| `originalLog` | <code>Object</code> | The raw log item as sent by the SDK |

For example
```javascript
test('logs example', async function() {
    Sentry.logger.info('user logged in', { userId: 42 })
    await Sentry.flush()

    const [log] = testkit.logs()
    expect(log.level).toEqual('info')
    expect(log.message).toEqual('user logged in')
    expect(log.attributes.userId).toEqual(42)
})
```

### `feedback()`
Gets all captured [user feedback](https://docs.sentry.io/platforms/javascript/user-feedback/) submitted via `Sentry.captureFeedback(...)` or the feedback widget.

**Returns**: <code>Array</code> - where each member of the array consists of a <code>FeedbackReport</code> type:

| Field | Type | Description |
|-------|------|-------------|
| `message` | <code>string</code> | The feedback message |
| `name` | <code>string</code> | The submitter's name, if provided |
| `contactEmail` | <code>string</code> | The submitter's email, if provided |
| `url` | <code>string</code> | The page the feedback was submitted from, if provided |
| `associatedEventId` | <code>string</code> | The id of the error event this feedback is linked to, if any |
| `source` | <code>string</code> | The feedback source, if provided |
| `replayId` | <code>string</code> | The associated replay id, if any |
| `eventId` | <code>string</code> | The feedback event's own id |
| `originalFeedback` | <code>Object</code> | The raw feedback event as sent by the SDK |

For example
```javascript
test('feedback example', async function() {
    Sentry.captureFeedback({ message: 'the checkout page is confusing', email: 'jane@example.com' })

    const [feedback] = await testkit.waitForFeedback(1)
    expect(feedback.message).toEqual('the checkout page is confusing')
    expect(feedback.contactEmail).toEqual('jane@example.com')
})
```

### `checkIns()`
Gets all captured [cron monitor check-ins](https://docs.sentry.io/platforms/javascript/crons/) reported via `Sentry.captureCheckIn(...)` or `Sentry.withMonitor(...)`.

**Returns**: <code>Array</code> - where each member of the array consists of a <code>CheckIn</code> type:

| Field | Type | Description |
|-------|------|-------------|
| `checkInId` | <code>string</code> | The check-in id (used to correlate an `in_progress` with its `ok`/`error`) |
| `monitorSlug` | <code>string</code> | The monitor's slug |
| `status` | <code>string</code> | `in_progress` \| `ok` \| `error` |
| `duration` | <code>number</code> | The check-in duration in seconds, for a finished check-in |
| `release` | <code>string</code> | The release, if set |
| `environment` | <code>string</code> | The environment, if set |
| `originalCheckIn` | <code>Object</code> | The raw check-in payload as sent by the SDK |

For example
```javascript
test('check-in example', async function() {
    const checkInId = Sentry.captureCheckIn({ monitorSlug: 'nightly-report', status: 'in_progress' })
    Sentry.captureCheckIn({ checkInId, monitorSlug: 'nightly-report', status: 'ok', duration: 12.5 })

    const checkIns = await testkit.waitForCheckIns(2)
    expect(checkIns.map(c => c.status)).toEqual(['in_progress', 'ok'])
})
```

### `reset()`
Resets the testkit state and clear all existing reports.

For example
```javascript
test('reset example', async function() {
    Sentry.captureException(new Error('Sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()).toHaveLength(1)
    testkit.reset()
    expect(testkit.reports()).toHaveLength(0)
})
```

:::tip
Calling `reset()` is very useful to run between tests, see more info and examples [here](/docs/getting-started#reset-between-tests)
:::
