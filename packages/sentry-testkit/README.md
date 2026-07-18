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
<a href="https://zivl.github.io/sentry-testkit/">
    <img src="https://img.shields.io/badge/Compatible%20with%20Sentry-v9%20%7C%20v10-blue" alt="compatible with Sentry v9 and v10">
  </a>
</p>

# sentry-testkit

Test what your app reports to [Sentry](https://sentry.io) — without sending anything to Sentry's servers.

**sentry-testkit** lets Sentry work natively in your application while running tests: reports are intercepted and logged into memory instead of being sent over the wire. Your tests can then assert on exactly what was (or wasn't) captured — errors, performance transactions, structured logs, and more — with nothing leaving your machine and no false reports swamping your Sentry project.

## Installation

```sh
npm install sentry-testkit --save-dev
# or
yarn add sentry-testkit --dev
```

Requires Sentry JavaScript SDK **v9 or v10** (`@sentry/browser`, `@sentry/node`, `@sentry/react`, `@sentry/react-native`). Using Sentry v8? Stay on `sentry-testkit@6`.

## Quick start

```javascript
const sentryTestkit = require('sentry-testkit')

const { testkit, sentryTransport } = sentryTestkit()

// initialize Sentry with the testkit transport
Sentry.init({
  dsn: 'https://public@dsn.ingest.sentry.io/000001',
  transport: sentryTransport,
  // ... other configurations
})

test('collects error events', async function() {
  // run any scenario that eventually calls Sentry.captureException(...)
  const reports = await testkit.waitForReports(1)
  expect(reports[0].error.message).toEqual('something went wrong')
})
```

## What you can assert on

```javascript
// Errors and messages
testkit.reports()
testkit.findReport(error)
testkit.findReportByMessage(/user \d+/)
testkit.reportsWithTag('section', 'billing')
testkit.getExceptionAt(0)

// Performance transactions and spans
testkit.transactions()
testkit.findTransaction('checkout-flow')
testkit.transactionsWithTag('flow', 'signup')

// Structured logs (Sentry.logger.*, requires enableLogs: true)
testkit.logs()

// Feature flags evaluated when an error was captured
testkit.reports()[0].flags // [{ flag: 'new-checkout', result: true }]

// Async-safe waiting — no sleeps, no flakiness
await testkit.waitForReports(2, { timeout: 3000 })
await testkit.waitForTransactions(1)
await testkit.waitForLogs(1)

// Clean state between tests
testkit.reset()
```

See the [full API reference](https://zivl.github.io/sentry-testkit/docs/api) for every method and the shape of `Report`, `Transaction`, and `Log` objects.

## Integration modes

The transport shown above is the most common setup, but the testkit can intercept Sentry traffic in whichever way fits your test environment:

| Mode | Use case |
|------|----------|
| **Transport** (`sentryTransport`) | Unit/integration tests — replace Sentry's HTTP sender |
| **Browser entry** (`sentry-testkit/browser`) | Same as transport, without any Node.js dependencies |
| **Local server** (`localServer`) | Spin up a real local endpoint that mimics Sentry's API and gives you a local DSN |
| **Puppeteer** (`testkit.puppeteer`) | E2E tests — capture the page's Sentry requests |
| **Network interception** (`initNetworkInterceptor`) | Bring your own interceptor (nock, MSW, ...) |
| **Jest mock** (`sentry-testkit/dist/jestMock`) | Auto-inject the testkit as `global.testkit` |

```javascript
// browser-only entry, no express/http imports
const sentryTestkit = require('sentry-testkit/browser')
const { testkit, sentryTransport } = sentryTestkit()
```

Guides for every mode live in the [documentation](https://zivl.github.io/sentry-testkit/).

## Documentation

Full documentation, guides, and migration notes: **https://zivl.github.io/sentry-testkit/**

- [Getting started](https://zivl.github.io/sentry-testkit/docs/getting-started)
- [API reference](https://zivl.github.io/sentry-testkit/docs/api)
- [Migration guides](https://zivl.github.io/sentry-testkit/docs/migration/version-7) (v7 drops Sentry v8 support and adds structured logs)
- [Changelog](https://github.com/zivl/sentry-testkit/blob/master/packages/sentry-testkit/CHANGELOG.md)

## Contributing

Contributions of any kind are welcome! See the [contribution guidelines](https://github.com/zivl/sentry-testkit/blob/master/CONTRIBUTING.md) to get started.

## License

[MIT](https://github.com/zivl/sentry-testkit/blob/master/LICENSE)
