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

### Working with [Jest](https://jestjs.io/en/)
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

### Using with [Puppeteer](https://pptr.dev/)
```javascript
const sentryTestkit = require('sentry-testkit')

const {testkit} = sentryTestkit()

testkit.puppeteer.startListening(page);

// Run any scenario that will call Sentry.captureException(...), for example:
await page.addScriptTag({ content: `throw new Error('An error');` });

expect(testkit.reports()).toHaveLength(1)

const report = testkit.reports()[0]
expect(report).toHaveProperty(...)

testkit.puppeteer.stopListening(page);
```

:::info
`startListening` has an optional `baseUrl` as second parameter (it defaults to 'https://sentry.io'), so you can pass the URL of your server:
```javascript
testkit.puppeteer.startListening(page, 'https://my-self-hosted-sentry.com');
```
:::

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

You may see more usage examples in the [testing section](https://github.com/wix/sentry-testkit/tree/master/test) of `sentry-testkit` repository as well

:::tip
Pay attention that Sentry reports the events asynchronously.
Even though `captureException` is synchronous function and you can get the `eventId` right away, the reporting itself still goes to an asynchronous flow.
Hence, it depends what you are testing and the chain of events caused by your test case scenario,
you will may need to use `async/await` and tools like [`wix-eventually`](https://github.com/wix/wix-eventually) or [`waitForExpect`](https://www.npmjs.com/package/wait-for-expect)
:::
