<p align="center">
<a href="https://npmjs.org/package/sentry-testkit">
    <img src="https://img.shields.io/npm/v/sentry-testkit.svg" alt="npm version">
  </a>
<a href="https://npmjs.org/package/sentry-testkit">
    <img src="https://img.shields.io/npm/dm/sentry-testkit.svg" alt="npm downloads">
  </a>
<a href="https://github.com/zivl/sentry-testkit/actions">
    <img src="https://github.com/zivl/sentry-testkit/workflows/Test/badge.svg" alt="Test">
  </a>
</p>
<p align="center">
<a href="#">
    <img src="https://img.shields.io/badge/Compatible%20with%20Sentry-v9-blue" alt="sentry version 9">
  </a>
<a href="#">
    <img src="https://img.shields.io/badge/Compatible%20with%20Sentry-v10-blue" alt="sentry version 10">
  </a>
</p>
<p align="center">
<a href="https://zivl.github.io/sentry-testkit/">
    <img alt="sentry-testkit" src="./packages/sentry-testkit-docs/static/img/logo/Sentry_github.svg" height="132">
    </a>
</p>

Test what your app reports to [Sentry](https://sentry.io/welcome/) — without sending anything to Sentry's servers.

When building tests for your application you want to assert that the right flow-tracking or error is being sent to _Sentry_, **but** without really sending it and swamping your Sentry project with false reports from test runs and CI.

## Sentry Testkit — to the rescue

_Sentry Testkit_ enables Sentry to work natively in your application while running tests: reports are intercepted and logged into memory instead of being sent over the wire. Your tests can then fetch and assert on everything that was (or wasn't) captured:

- **Errors and messages** — `captureException`, `captureMessage`, breadcrumbs, tags, extra, user
- **Performance transactions and spans** — names, ops, attributes, span trees
- **Structured logs** — everything sent via `Sentry.logger.*`
- **Feature flags** — which flags were evaluated when an error was captured
- **Async-safe assertions** — built-in `waitFor*` helpers, no sleeps and no flaky tests

## Installation

**npm:**
```sh
npm install sentry-testkit --save-dev
```
**yarn:**
```sh
yarn add sentry-testkit --dev
```

Requires Sentry JavaScript SDK **v9 or v10**. Using Sentry v8? Stay on `sentry-testkit@6` or see the [v7 migration guide](https://zivl.github.io/sentry-testkit/docs/migration/version-7).

## Usage

```javascript
// some.spec.js
const sentryTestkit = require('sentry-testkit')

const { testkit, sentryTransport } = sentryTestkit()

// initialize your Sentry instance with sentryTransport
Sentry.init({
    dsn: 'some_dummy_dsn',
    transport: sentryTransport,
    enableLogs: true, // if you want to test Sentry.logger.* calls
    //... other configurations
})

test('collects error events', async function () {
  // run any scenario that eventually calls Sentry.captureException(...)
  const reports = await testkit.waitForReports(1)
  expect(reports[0].error.message).toEqual('something went wrong')
})

test('collects performance events', async function () {
  // run any scenario that eventually starts and ends a span
  await testkit.waitForTransactions(1)
  expect(testkit.findTransaction('checkout-flow')).toBeDefined()
})

test('collects structured logs', async function () {
  Sentry.logger.info('user logged in', { userId: 42 })
  await Sentry.flush()
  expect(testkit.logs()[0].attributes.userId).toEqual(42)
})
```

More querying power when you need it:

```javascript
testkit.findReportByMessage(/user \d+/)
testkit.reportsWithTag('section', 'billing')
testkit.transactionsWithTag('flow', 'signup')
testkit.reports()[0].flags // [{ flag: 'new-checkout', result: true }]
testkit.reset()            // clean state between tests
```

## Integration modes

The custom transport shown above is the most common setup, but the testkit can intercept Sentry traffic in whichever way fits your test environment:

| Mode | Use case |
|------|----------|
| **Transport** (`sentryTransport`) | Unit/integration tests — replaces Sentry's HTTP sender |
| **Browser entry** (`sentry-testkit/browser`) | Same as transport, without any Node.js dependencies |
| **Local server** (`localServer`) | A real local endpoint that mimics Sentry's API and generates a local DSN |
| **Puppeteer** (`testkit.puppeteer`) | E2E tests — captures the page's Sentry requests |
| **Network interception** (`initNetworkInterceptor`) | Bring your own interceptor (nock, MSW, ...) |
| **Jest mock** (`sentry-testkit/dist/jestMock`) | Auto-injects the testkit as `global.testkit` |

### Running in browser

`sentry-testkit` relies on `express` and `http` packages from NodeJS. We have a separate entry `sentry-testkit/browser` which does not include any NodeJS-related code:

```javascript
const sentryTestkit = require('sentry-testkit/browser')

const { testkit } = sentryTestkit()
// Your code for browser
```

## Testkit API

See the full API description and documentation here: https://zivl.github.io/sentry-testkit/

## Roadmap

sentry-testkit is expanding to cover the full modern Sentry SDK surface — user feedback, cron check-ins, sessions, session replay, attachments, metrics, and more. Follow (or help shape) the plan in the [tracking issue](https://github.com/zivl/sentry-testkit/issues/313).

## Raven-Testkit

The good old legacy `raven-testkit` documentation can be found [here](LEGACY_API.md). It is still there to serve `Raven`, which is the old legacy SDK of _Sentry_ for JavaScript/Node.js platforms.

## Change Log

We're constantly and automatically updating our [CHANGELOG](./packages/sentry-testkit/CHANGELOG.md) file, so it's always a good spot to check out what we have been up to...

## Contribution

We'd love any kind of contribution to get better, improve our capabilities, fix bugs, and bring more features as Sentry expands their tools as well. Please check our [CONTRIBUTING](./CONTRIBUTING.md) guidelines for more info and how to get started.

## License

Sentry Testkit is [MIT licensed](./LICENSE).
