---
title: API Reference
description: Sentry Testkit API Reference documentation.
sidebar_position: 2
---

# API Reference
Sentry Testkit consists of a very simple and strait-forward API using the following functions

## Methods
* [`reports()`](#reports)
* [`findReport(error)`](#findreporterror)
* [`isExist(error)`](#isexisterror)
* [`getExceptionAt(index)`](#getexceptionatindex)
* [`transactions()`](#transactions)
* [`reset()`](#reset)

### What About Nodejs? - Of Course!
Sentry Testkit has full support in both `@sentry/browser` and `@sentry/node` (as well as other `@sentry/<what-ever>` clients) since they have the same API and lifecycle under the hood.

:::note Raven-Testkit
The good old legacy `raven-testkit` documentation can be found [here](../raven-testkit-legacy). It it still there to serve `Raven` which is the old legacy SDK of *Sentry* for JavaScript/Node.js platforms
:::

## Reference
### `reports()`
Gets all existing reports.

**Returns**: <code>Array</code> - where each member of the array consists of *Sentry's* <code>Report</code> type.

**See**: You may refer to the definition of [<code>Report</code>](./types#report) for further explanation and details.

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
Here we use [`wait-for-expect`](https://www.npmjs.com/package/wait-for-expect) library to emphasize that sometimes we need to **wait** until the report is being sent as it is done asynchronously.
:::

### `findReport(error)`
Finds a report by a given error.

Uses [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) under the hood

**Arguments**
* error: `Error` - An error object to look for in the reports

**Returns**: <code>Report</code> \| <code>undefined</code> - the report object if one found. `undefined` otherwise.

**See**: You may refer to the definition of [<code>Report</code>](./types#report) for further explanation and details.

For example
```javascript
test('findReport example', async function() {
    const err = new Error('error to look for')

    // Some faulty scenario that will report err

    const report = testkit.findReport(err)
    expect(report).toBeDefined()
})
```

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

**See**: You may refer to the definition of [<code>ReportError</code>](./types#reporterror) for further explanation and details.

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

**See**: You may refer to the definition of [<code>Transaction</code>](./types#transaction) for further explanation and details.

For example
```javascript
test('transactions example', async function() {
    // Some scenario that will create a transaction...

    await waitForExpect(() => expect(testkit.transactions().length).toBeGreaterThan(0))
    const transactions = testkit.transactions()

    // Do what ever you want with the transactions
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
