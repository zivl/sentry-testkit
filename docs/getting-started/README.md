
## Installation
```
npm install sentry-testkit --save-dev
```

## Using in tests
```javascript
const sentryTestkit = require('sentry-testkit')

const {testkit, sentryTransport} = sentryTestkit()

// initialize your Sentry instance with sentryTransport
Sentry.init({
    dsn: 'some_dummy_dsn',
    transport: sentryTransport,
    //... other configurations
})

// then run any scenario that eventually calls Sentry.catchException(...)

expect(testKit.reports()).toHaveLength(1)
const report = testKit.reports()[0]
expect(report).toHaveProperty(...)
```

You may see more usage examples in the [testing section](https://github.com/wix/sentry-testkit/tree/master/test) of `sentry-testkit` repository as well

## Caveats
* Pay attention that Sentry reports the events asynchronously.
Even though `captureException` is synchronous function and you can get the `eventId` right away, the reporting itself still goes to an asynchronous flow.
Hence, it depends what you are testing and the chain of events caused by your test case scenario,
you will may need to use `async/await` and tools like [`waitForExpect`](https://www.npmjs.com/package/wait-for-expect)
