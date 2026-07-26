---
title: Privacy
description: How the sentry-testkit documentation site handles analytics and your privacy
---

# Privacy

This page describes how the **sentry-testkit documentation site** handles analytics. It applies to this website only.

## The library itself collects nothing

`sentry-testkit` is a test-time library. It intercepts your Sentry reports, keeps them in memory for the duration of your test run, and never sends anything anywhere - that is the entire point of it. It has no telemetry, phones no home, and nothing on this page applies to the code you install.

## What this site measures

We use Google Analytics 4 to understand which parts of the documentation are actually useful, so we know what to improve. That means:

- which pages get visited, and in what order
- roughly which country or region readers come from
- which browsers and devices are used

Analytics runs only on the published site at `zivl.github.io/sentry-testkit`. It is disabled entirely in local development.

## What we do not do

- We run no server and store no data of our own. There is no database, no logs, no backend - this site is static files on GitHub Pages.
- We collect nothing personal or identifying. No names, no email addresses, no accounts, no form submissions.
- Google Analytics 4 does not log or store IP addresses. The site is also configured with `anonymizeIP` enabled.
- No advertising, no remarketing, no selling or sharing of data with anyone.
- We only ever see aggregated, anonymous reports - counts and trends. We cannot identify an individual reader, and we have never tried to.

To be clear about how this works: Google Analytics does send pageview data to Google's servers, and Google processes it on our behalf. We simply do not receive, keep, or want anything beyond the aggregate numbers.

## Third-party services

Two services are loaded on this site:

- **Google Analytics 4** - usage measurement, as described above. It sets a `_ga` cookie in your browser. See Google's [privacy policy](https://policies.google.com/privacy) and [how Google uses data from sites that use its services](https://policies.google.com/technologies/partner-sites).
- **Algolia DocSearch** - powers the search box at the top of the page. When you type a search query, that query text is sent to Algolia to return results. See [Algolia's privacy policy](https://www.algolia.com/policies/privacy).

## How to opt out

If you would rather not be counted:

- install Google's [opt-out browser add-on](https://tools.google.com/dlpage/gaoptout), or
- use any content or ad blocker - most block Google Analytics by default.

Nothing on this site breaks when analytics is blocked. Every page, code sample, and search still works exactly the same.

## Questions

If something here is unclear or you think we have got it wrong, [open an issue](https://github.com/zivl/sentry-testkit/issues) and we will fix it.
