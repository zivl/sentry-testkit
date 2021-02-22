<p align="center">
    <img alt="sentry-teskit" src="./docs/logo/Sentry_github.svg" height="132">
</p>


[![npm version](https://img.shields.io/npm/v/sentry-testkit.svg)](https://npmjs.org/package/sentry-testkit)
[![npm downloads](https://img.shields.io/npm/dm/sentry-testkit.svg)](https://npmjs.org/package/sentry-testkit)
[![Test](https://github.com/wix/sentry-testkit/workflows/Test/badge.svg)](https://github.com/wix/sentry-testkit/actions)
![sentry version 5](https://img.shields.io/badge/Compatible%20with%20Sentry-v5-blue)
![sentry version 6](https://img.shields.io/badge/Compatible%20with%20Sentry-v6-blue)

Sentry is an open-source JavaScript SDK published by [Sentry](https://sentry.io/welcome/) to enable error tracking that helps developers monitor and fix crashes in real time.<br>
However, when building tests for your application, you want to assert that the right flow-tracking or error is being sent to *Sentry*, **but** without really sending it to *Sentry* servers. This way you won't swamp Sentry with false reports during test running and other CI operations.

## Sentry Testkit - to the rescue
*Sentry Testkit* enables Sentry to work natively in your application, and by overriding the default Sentry transport mechanism, the report is not really sent but rather logged locally into memory. In this way, the logged reports can be fetched later for your own usage, verification, or any other use you may have in your local developing/testing environment.


## Usage
### Installation
```
npm install sentry-testkit --save-dev
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

test('something', function () {
  // run any scenario that eventually calls Sentry.captureException(...)
  expect(testKit.reports()).toHaveLength(1)
  const report = testKit.reports()[0]
  expect(report).toHaveProperty(...)
});
```

### Working with []() [Jest](https://jestjs.io/en/)
We've added a new option to integrate `sentry-testkit` with `jest`'s mocking mechanism. Detailed implementation can be seen [here](https://github.com/wix/sentry-testkit/blob/master/src/jestMock.js).

At the moment it is available only to `@sentry/browser` package but we will expand to more packages as we should figure out how to do it right for all Sentry's client packages.

If you're using `Jest` for testing, all you have to do in your `spec.js` file is to import the Jest mock.
```javascript
// some.spec.js
import { testkit } from 'sentry-testkit/dist/jestMock';

test('something', function () {
    // click
    // clack
    // BOOM!
    expect(testkit.reports().length).toBeGreaterThan(0);
});
```
> Make sure to put your `import` statement before all other imports.

## Network interception support
Instead of modifying your application code, you can use network interception libraries in conjunction with the testkit.\
Example with [nock](https://github.com/nock/nock):
```javascript

const nock = require('nock')
const sentryTestkit = require('sentry-testkit')
const { testkit, initNetworkInterceptor } = sentryTestkit()

beforeAll(() => {
    const myAppDSN = '<your DSN goes here>'
    initNetworkInterceptor(myAppDSN, (baseUrl, handleRequestBody) => {
      // This callback is where we init our interceptor.
      // The interceptor should intercept requests from `baseUrl` and pass the
      // request body (as json) to the `handleRequestBody` function.
      nock(baseUrl)
        .persist()
        .post(/.*/)
        .reply(200, (_, requestBody) => {
          handleRequestBody(requestBody)
        })
    })
})

test('findReport example', async function() {
    const err = new Error('error to look for')

    // Some faulty scenario that will report err

    const report = testkit.findReport(err)
    expect(report).toBeDefined()
})
```

## Yes! We 💙 [Puppeteer](https://pptr.dev/)
```javascript
const sentryTestkit = require('sentry-testkit')

const {testkit} = sentryTestkit()

testkit.puppeteer.startListening(page);

// Run any scenario that will call Sentry.captureException(...), for example:
await page.addScriptTag({ content: `throw new Error('An error');` });

expect(testKit.reports()).toHaveLength(1)
const report = testKit.reports()[0]
expect(report).toHaveProperty(...)

testkit.puppeteer.stopListening(page);
```

You may see more usage examples in the testing section of this repository as well.

## Test Kit API
See full API description and documentation here: https://wix.github.io/sentry-testkit/

## What About Nodejs?
**Of Course!**
`sentry-testkit` have full support in both `@sentry/browser` and `@sentry/node` since they have the same API and lifecycle under the hood.

## Raven-Testkit
The good old legacy `raven-testkit` documentation can be found [here](LEGACY_API.md). It it still there to serve `Raven` which is the old legacy SDK of *Sentry* for JavaScript/Node.js platforms
