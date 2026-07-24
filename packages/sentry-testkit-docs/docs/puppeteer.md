---
title: Puppeteer
description: Capture Sentry requests from a Puppeteer page with Sentry Testkit
sidebar_position: 6
---

# Using with [Puppeteer](https://pptr.dev/)

When testing a real browser with [Puppeteer](https://pptr.dev/), `sentry-testkit` can intercept the Sentry requests the page makes — no change to your application's `Sentry.init` is required.

Pass the Puppeteer `page` to `testkit.puppeteer.startListening(page)` and the testkit captures everything the page sends to Sentry — reports, transactions, logs, feedback, and check-ins — so you can assert on it with the usual API.

```javascript
const sentryTestkit = require('sentry-testkit')

const { testkit } = sentryTestkit()

testkit.puppeteer.startListening(page)

// Run any scenario that will call Sentry.captureException(...), for example:
await page.addScriptTag({ content: `throw new Error('An error');` })

expect(testkit.reports()).toHaveLength(1)
const report = testkit.reports()[0]
expect(report).toHaveProperty(...)

testkit.puppeteer.stopListening(page)
```

## Self-hosted Sentry

`startListening` accepts an optional `baseUrl` as a second parameter (it defaults to `https://sentry.io`), so you can point it at your own server:

```javascript
testkit.puppeteer.startListening(page, 'https://my-self-hosted-sentry.com')
```

:::tip
Sentry sends events asynchronously. Prefer the awaitable [`waitForReports`](/docs/api#waitforreportscount-options) helper (and its siblings `waitForTransactions`, `waitForLogs`, `waitForFeedback`, `waitForCheckIns`) over asserting immediately after triggering the scenario.
:::

:::info
Prefer Playwright? See the [Playwright guide](/docs/playwright) — the integration is identical.
:::
