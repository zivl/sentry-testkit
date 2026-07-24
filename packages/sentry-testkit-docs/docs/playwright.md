---
title: Playwright
description: Capture Sentry requests from a Playwright page with Sentry Testkit
sidebar_position: 7
---

# Using with [Playwright](https://playwright.dev/)

The Playwright integration mirrors the [Puppeteer](/docs/puppeteer) one. Pass a Playwright `Page` to `testkit.playwright.startListening(page)` and the testkit captures everything the page sends to Sentry — reports, transactions, logs, feedback, and check-ins — with no change to your application's `Sentry.init`.

```javascript
const sentryTestkit = require('sentry-testkit')

const { testkit } = sentryTestkit()

testkit.playwright.startListening(page)

// Run any scenario that will call Sentry.captureException(...), for example:
await page.addScriptTag({ content: `throw new Error('An error');` })

expect(testkit.reports()).toHaveLength(1)

testkit.playwright.stopListening(page)
```

## Self-hosted Sentry

As with Puppeteer, `startListening` accepts an optional `baseUrl` as a second parameter (it defaults to `https://sentry.io`) for self-hosted Sentry:

```javascript
testkit.playwright.startListening(page, 'https://my-self-hosted-sentry.com')
```

:::tip
Sentry sends events asynchronously. Prefer the awaitable [`waitForReports`](/docs/api#waitforreportscount-options) helper (and its siblings `waitForTransactions`, `waitForLogs`, `waitForFeedback`, `waitForCheckIns`) over asserting immediately after triggering the scenario.
:::
