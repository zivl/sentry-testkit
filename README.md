<p align="center">
<a href="https://npmjs.org/package/sentry-testkit">
    <img src="https://img.shields.io/npm/v/sentry-testkit.svg" alt="npm version">
  </a>
<a href="https://npmjs.org/package/sentry-testkit">
    <img src="https://img.shields.io/npm/dm/sentry-testkit.svg" alt="npm downloads">
  </a>
<a href="https://github.com/wix/sentry-testkit/actions">
    <img src="https://github.com/wix/sentry-testkit/workflows/Test/badge.svg" alt="Test">
  </a>
</p>
<p align="center">
<a href="#">
    <img src="https://img.shields.io/badge/Compatible%20with%20Sentry-v6-blue" alt="sentry version 6">
  </a>
<a href="#">
    <img src="https://img.shields.io/badge/Compatible%20with%20Sentry-v7-blue" alt="sentry version 7">
  </a>
</p>
</p>
<p align="center">
<a href="https://wix.github.io/sentry-testkit/">
    <img alt="sentry-teskit" src="./docs/logo/Sentry_github.svg" height="132">
    </a>
</p>

Sentry is an open-source JavaScript SDK published by [Sentry](https://sentry.io/welcome/) to enable error tracking that helps developers monitor and fix crashes in real time.<br>
However, when building tests for your application, you want to assert that the right flow-tracking or error is being sent to _Sentry_, **but** without really sending it to _Sentry_ servers. This way you won't swamp Sentry with false reports during test running and other CI operations.

## Sentry Testkit - to the rescue

_Sentry Testkit_ enables Sentry to work natively in your application, and by overriding the default Sentry transport mechanism, the report is not really sent but rather logged locally into memory. In this way, the logged reports can be fetched later for your own usage, verification, or any other use you may have in your local developing/testing environment.

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

## Testkit API

See full API description and documentation here: https://wix.github.io/sentry-testkit/

## Running in browser

`sentry-testkit` relies on `express` and `http` packages from NodeJS. We have separated entry `sentry-testkit/browser` where we not include any NodeJS-related code.

```javascript
const sentryTestkit = require('sentry-testkit/browser')

const { testkit } = sentryTestkit()
// Your code for browser
```

## Raven-Testkit
The good old legacy `raven-testkit` documentation can be found [here](LEGACY_API.md). It it still there to serve `Raven` which is the old legacy SDK of _Sentry_ for JavaScript/Node.js platforms

## Change Log
We're constantly and automatically updating our [CHANGELOG](./CHANGELOG.md) file, so its always a good spot to checkout what have we been up to...

## Contribution
We'd love any kind of contribution, to get better, improve our capabilities, fix bugs and bring more features as Sentry expanding their tools as well. Please check our [CONTRIBUTING](./CONTRIBUTING.md) guidelines for more info and how to get started.

## License

Sentry Testkit is [MIT licensed](./LICENSE).
