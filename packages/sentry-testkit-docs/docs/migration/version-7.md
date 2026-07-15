# Version 7 Migration Guide

`sentry-testkit` version 7 is a major release. It introduces support for Sentry's structured logs and drops support for Sentry SDK v8. This guide will help you to migrate your existing codebase to the new version.

## Added Features

### Structured Logs support — `testkit.logs()`

Version 7 introduces support for [Sentry structured logs](https://docs.sentry.io/platforms/javascript/logs/). Logs sent via `Sentry.logger.*` are captured in all integration modes (transport, local server, network interception, and Puppeteer) and can be asserted on with the new `testkit.logs()` API:

```javascript
Sentry.init({
  dsn: '<your DSN>',
  transport: sentryTransport,
  enableLogs: true,
})

test('logs example', async function() {
    Sentry.logger.info('user logged in', { userId: 42 })
    await Sentry.flush()

    const [log] = testkit.logs()
    expect(log.level).toEqual('info')
    expect(log.message).toEqual('user logged in')
    expect(log.attributes.userId).toEqual(42)
})
```

See the [`logs()` API reference](/docs/api#logs) for the full shape of the captured `Log` object.

### Multi-item envelope parsing

The testkit now parses **all** items of a Sentry envelope instead of only the first one. Events and transactions are captured regardless of their position in the envelope — for example, an error event batched together with a session update is no longer dropped. This also lays the groundwork for capturing more Sentry data types (user feedback, cron check-ins, sessions, replays, and more) in upcoming releases.

## Breaking Changes

### Dropped Sentry SDK v8 support

Starting from version 7, `sentry-testkit` only supports Sentry SDKs for JavaScript packages at **version 9 and above**. The structured logs API (`Sentry.logger`) that powers `testkit.logs()` does not exist in Sentry v8.

If you are using Sentry SDK v8, you have two options:

- **Upgrade** your `@sentry/*` packages to v9 or v10 (see the official [v8 to v9 migration guide](https://docs.sentry.io/platforms/javascript/migration/v8-to-v9/)), or
- **Stay** on `sentry-testkit@6`, which continues to support Sentry v8, v9, and v10.

### Compatibility matrix

| sentry-testkit | Sentry JS SDK (browser / node / react) |
|----------------|----------------------------------------|
| 6.x            | v8, v9, v10                             |
| 7.x            | v9, v10                                 |

## No other API changes

The rest of the testkit API is unchanged — `reports()`, `transactions()`, `findReport()`, `isExist()`, `getExceptionAt()`, `reset()`, and all integration modes work exactly as they did in version 6. No changes are required in your existing test code.
