---
title: Getting Started
description: Getting started with Sentry Testkit
sidebar_position: 1
---

# Getting Started

## Installation
**npm:**
```
npm install sentry-testkit --save-dev
```
**yarn:**
```
yarn add sentry-testkit --dev
```

## Usage
```javascript
// some.spec.js
const sentryTestkit = require('sentry-testkit')

const {testkit, sentryTransport} = sentryTestkit()

// initialize your Sentry instance with sentryTransport
Sentry.init({
    dsn: 'some_dummy_dsn',
    transport: sentryTransport,
    //... other configurations
})

test('collect error events', function () {
  // run any scenario that eventually calls Sentry.captureException(...)
  expect(testkit.reports()).toHaveLength(1)
  const report = testkit.reports()[0]
  expect(report).toHaveProperty(...)
});

// Similarly for performance events
test('collect performance events', function () {
  // run any scenario that eventually calls Sentry.startTransaction(...)
  expect(testkit.transactions()).toHaveLength(1)
});
```

### Beyond errors: logs, feedback and check-ins

`sentry-testkit` captures more than errors and transactions. If your app uses these Sentry features, you can assert on them the same way — each has its own accessor and an awaitable `waitFor*` helper:

- **[Structured logs](/docs/api#logs)** — everything sent via `Sentry.logger.*` (requires `enableLogs: true` in `Sentry.init`), via `testkit.logs()`
- **[User feedback](/docs/api#feedback)** — submissions from `Sentry.captureFeedback(...)` or the feedback widget, via `testkit.feedback()`
- **[Cron check-ins](/docs/api#checkins)** — monitor check-ins from `Sentry.captureCheckIn(...)` / `Sentry.withMonitor(...)`, via `testkit.checkIns()`

```javascript
Sentry.captureFeedback({ message: 'the checkout page is confusing' })

const [feedback] = await testkit.waitForFeedback(1)
expect(feedback.message).toEqual('the checkout page is confusing')
```

### End-to-end testing (Puppeteer & Playwright)

For browser end-to-end tests, `sentry-testkit` can capture the Sentry requests a page makes — no change to your application's `Sentry.init` is required. See the dedicated guides:

- [Using with Puppeteer](/docs/puppeteer)
- [Using with Playwright](/docs/playwright)

### Reset between tests
As you might run more than one test with *Sentry* and *Sentry-Testkit*, you might want to use the `reset` function in between tests.
Usually, your testing framework will have a hook for that kind of action. In the following example, We're using [Jest](https://jestjs.io/docs/en/api.html)'s hooks: `beforeEach`, `beforeAll`
```javascript
beforeEach(function(){
    testkit.reset()
})
```
```javascript
beforeAll(function(){
    testkit.reset()
})
```

You may see more usage examples in the [testing section](https://github.com/zivl/sentry-testkit/tree/master/test) of `sentry-testkit` repository as well

:::tip
Pay attention that Sentry reports the events asynchronously.
Even though `captureException` is synchronous function and you can get the `eventId` right away, the reporting itself still goes to an asynchronous flow.
Hence, it depends what you are testing and the chain of events caused by your test case scenario,
you will may need to use `async/await` and tools like [`wix-eventually`](https://github.com/wix/wix-eventually) or [`waitForExpect`](https://www.npmjs.com/package/wait-for-expect)
:::
