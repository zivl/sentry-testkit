---
title: Sentry JavaScript SDK v10 compatibility
description: Using sentry-testkit with Sentry JavaScript SDK v10
sidebar_position: 2
---

# Sentry JavaScript SDK v10 compatibility

`sentry-testkit` supports [Sentry JavaScript SDK v10](https://docs.sentry.io/platforms/javascript/migration/v9-to-v10/). No code changes are required in your test setup when upgrading from Sentry v8 or v9 to v10.

## What's the same

- **Transport API** — sentry-testkit continues to use the same custom `transport` option in `Sentry.init()`. The envelope-based transport contract used by Sentry v7+ is unchanged in v10.
- **Testkit API** — `testkit.reports()`, `testkit.transactions()`, `testkit.reset()`, and the rest of the testkit API work the same with Sentry v10.

## Sentry v10 changes (reference)

If you are upgrading your application to Sentry v10, be aware of the [official migration guide](https://docs.sentry.io/platforms/javascript/migration/v9-to-v10/). Notable changes in the SDK (none of which affect sentry-testkit usage) include:

- **OpenTelemetry** — All OpenTelemetry dependencies are upgraded to v2. If you rely on specific OpenTelemetry versions, review the migration guide.
- **Removed FID** — First Input Delay (FID) web vital is no longer reported; INP (Interaction to Next Paint) is used instead.
- **Removed APIs** — `BaseClient` → use `Client`; `hasTracingEnabled` → use `hasSpansEnabled`; `_experiments.enableLogs` / `beforeSendLog` are now top-level `enableLogs` and `beforeSendLog` options.
- **User IP** — As of v10.4.0, IP address collection is gated by the `sendDefaultPii` init option.

## Compatibility matrix

| sentry-testkit | Sentry JS SDK (browser / node / react) |
|----------------|----------------------------------------|
| 6.x            | v8, v9, v10                             |

For React Native, use `@sentry/react-native` with a version that matches your chosen Sentry JavaScript SDK line (see [Sentry React Native docs](https://docs.sentry.io/platforms/react-native/)).

## Running tests with Sentry v10

Install Sentry v10 in your project and pass the testkit transport as usual:

```javascript
const sentryTestkit = require('sentry-testkit')
const { testkit, sentryTransport } = sentryTestkit()

Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  transport: sentryTransport,
  // ... other options
})

// Your tests
expect(testkit.reports()).toHaveLength(1)
```

No changes are required in your test code when moving to Sentry v10.
