# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Also read [CONTRIBUTING.md](CONTRIBUTING.md) for additional contribution guidelines — it may be updated independently and takes precedence for commit conventions, git workflow, and release process details.

## Project Overview

**sentry-testkit** is a testing utility library that intercepts Sentry error/performance reports during tests, storing them in memory rather than sending them to Sentry's servers. Tests can then assert on what was (or wasn't) reported.

## Commands

This is a **Yarn 4 monorepo**. Most work happens in `packages/sentry-testkit/`.

```bash
# From repo root
yarn build         # Build the sentry-testkit package
yarn test          # Run all tests for sentry-testkit
yarn test:expo     # Run tests for expo-react-native test app
yarn lint          # Lint the sentry-testkit package

# From packages/sentry-testkit/
yarn test -- <pattern>                          # Run tests matching file pattern
yarn test -- --testNamePattern="<test name>"   # Run tests matching name pattern
yarn test -- local-server.test.ts              # Run a specific test file
```

## Architecture

The library supports multiple integration modes, each solving how to intercept Sentry's outgoing requests:

| Mode | Entry | How it works |
|------|-------|-------------|
| Node.js / Browser | `index.ts` / `browser.ts` | Custom Sentry transport (replaces the HTTP sender) |
| Local Server | `localServerApi.ts` | Express server that mimics Sentry's API, generates a local DSN |
| Puppeteer | `testkit.ts` | Intercepts page network requests via Puppeteer's Page API |
| Network Interceptor | `initNetworkInterceptor.ts` | Callback-based hook for manual network capture (e.g. nock) |
| Jest Mock | `jestMock.ts` | Convenience wrapper that auto-injects testkit into `global.testkit` |

### Data Flow

1. Sentry SDK calls transport → `sentryTransport.ts` intercepts it
2. Raw event/envelope is parsed by `parsers.ts`
3. Transformed into `Report` or `Transaction` by `transformers.ts`
4. Stored in-memory arrays inside `testkit.ts`
5. Tests query via `testkit` API: `reports()`, `transactions()`, `getExceptionAt()`, `findReport()`, `isExist()`, `reset()`

### Key Files

- [src/index.ts](packages/sentry-testkit/src/index.ts) — Main entry; exports `create()` returning `{ sentryTransport, testkit, initNetworkInterceptor, localServer }`
- [src/browser.ts](packages/sentry-testkit/src/browser.ts) — Same as index but without Node.js/Express dependencies
- [src/testkit.ts](packages/sentry-testkit/src/testkit.ts) — Core in-memory store and Puppeteer integration
- [src/sentryTransport.ts](packages/sentry-testkit/src/sentryTransport.ts) — Sentry transport adapter (supports Sentry v4–v7+ envelope format)
- [src/transformers.ts](packages/sentry-testkit/src/transformers.ts) — Converts raw Sentry events into typed `Report`/`Transaction` objects
- [src/localServerApi.ts](packages/sentry-testkit/src/localServerApi.ts) — Express server handling `/api/{project}/store/` and `/api/{project}/envelope/`
- [src/types.ts](packages/sentry-testkit/src/types.ts) — All public TypeScript interfaces (`Testkit`, `Report`, `Transaction`, `Span`, etc.)

### Test Structure

Tests are in `packages/sentry-testkit/__tests__/`:
- `commonTests.ts` — Shared test suite exercised by node, browser, and react tests
- `node.test.ts`, `browser.test.ts`, `react.test.tsx` — Mode-specific wrappers around common tests
- `puppeteer.test.ts`, `local-server.test.ts`, `network-interception.test.ts`, `jest-mock.test.ts` — Integration-specific tests

### Git Workflow

- **Always rebase** instead of merge when integrating branches (`git rebase`, not `git merge`)
- **Squash commits** when merging a PR — each PR should land as a single commit on `master`

### Releases

Uses [release-please-action](https://github.com/googleapis/release-please-action) for automated releases. Follow **conventional commits** (`feat:`, `fix:`, `chore:`, etc.) — commit type determines version bump.
