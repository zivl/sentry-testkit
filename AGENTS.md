# AGENTS.md

Instructions for AI coding agents (Claude Code, OpenAI Codex, Gemini CLI, and others) working in this repository. This is the **single canonical instructions file** — `CLAUDE.md` only references this one.

> Also read [CONTRIBUTING.md](CONTRIBUTING.md) for commit conventions, git workflow, and release details — it takes precedence on those topics.

---

## Skills

This file is the always-loaded baseline. Detailed, task-scoped guidance lives in [`skills/`](skills/) as plain markdown — no tool-specific format, so any agent or human can read it.

**Read the relevant skill file before starting that phase of work.** Do not work from the summary below; the skills contain repo-specific rules that are not derivable from the code.

| Skill | Read it when |
|-------|--------------|
| [Code Writing](skills/code-writing.md) | Implementing a feature or fix in `packages/sentry-testkit/src/` |
| [Code Quality](skills/code-quality.md) | Before opening a PR: formatting, lint, types, build, semver |
| [Testing](skills/testing.md) | Adding or changing tests in `packages/sentry-testkit/__tests__/` |
| [Docs Writing](skills/docs-writing.md) | Public API changed, or docs under `packages/sentry-testkit-docs/` |
| [Code Review](skills/code-review.md) | Reviewing a PR, or self-reviewing a diff before pushing |

A typical change touches all five, in that order. The [PR template](.github/PULL_REQUEST_TEMPLATE.md) checklist maps onto them one-to-one.

### The highest-value rule

Envelope item types are dispatched in **three independent places**. Adding support for a new Sentry envelope type means changing all three, or one integration mode silently drops the data while every other mode's tests still pass:

- `src/parsers.ts` → `handleEnvelopeRequestData` (local server, network interceptor)
- `src/testkit.ts` → `createRequestHandler` (Puppeteer, Playwright)
- `src/sentryTransport.ts` → `send` (transport mode: Node, browser, React)

See [Code Writing](skills/code-writing.md) for the full checklist.

---

## Project Overview

**sentry-testkit** is a testing utility library. It intercepts Sentry SDK error/performance reports during tests, stores them in memory, and exposes an API for test assertions. Reports never reach Sentry's servers.

This is a **Yarn 4 monorepo**. The main package is `packages/sentry-testkit/`. There is also an Expo/React Native test app under `apps/`.

---

## Setup

```bash
git clone git@github.com:zivl/sentry-testkit.git
cd sentry-testkit
yarn install
```

**Node version**: use whatever `.nvmrc` / `.node-version` specifies, or the `engines` field in `package.json`.

---

## Commands

Run from the **repo root** unless noted:

```bash
yarn build          # Build the sentry-testkit package (this is also the type check)
yarn test           # Run all tests for sentry-testkit
yarn test:expo      # Run tests for the Expo/React Native app
yarn lint           # Lint the sentry-testkit package

# From packages/sentry-testkit/ — narrower runs:
yarn test -- <file-pattern>                        # e.g. node.test.ts
yarn test -- --testNamePattern="<test name>"       # filter by test name
yarn lint:fix                                      # auto-fix formatting
```

Before finishing any change that touches `packages/sentry-testkit/`, all three must pass:

```bash
yarn lint && yarn build && yarn test
```

`yarn build` runs `tsc` — there is no separate typecheck script, so do not skip it. See [Code Quality](skills/code-quality.md).

---

## Architecture

The library provides multiple integration modes:

| Mode | Entry file | Mechanism |
|------|-----------|-----------|
| Node.js / Browser | `index.ts` / `browser.ts` | Custom Sentry transport replaces the HTTP sender |
| Local Server | `localServerApi.ts` | Express server that mimics Sentry's API; returns a local DSN |
| Puppeteer / Playwright | `testkit.ts` | Intercepts page network requests via the Page API |
| Network Interceptor | `initNetworkInterceptor.ts` | Callback hook for manual capture (e.g. nock) |
| Jest Mock | `jestMock.ts` | Convenience wrapper; injects testkit into `global.testkit` |

### Data flow

```
Sentry SDK call
  → sentryTransport.ts   (intercept)
  → parsers.ts           (parse raw envelope / event)
  → transformers.ts      (convert to Report / Transaction)
  → testkit.ts           (store in memory arrays)
  → test assertions      (reports(), transactions(), getExceptionAt(), …)
```

### Key source files (`packages/sentry-testkit/src/`)

| File | Purpose |
|------|---------|
| `index.ts` | Main entry; exports `create()` → `{ sentryTransport, testkit, initNetworkInterceptor, localServer }` |
| `browser.ts` | Same as index but without Node.js / Express imports |
| `testkit.ts` | Core in-memory store + Puppeteer integration |
| `sentryTransport.ts` | Transport adapter (envelope-based; supports Sentry v9/v10) |
| `parsers.ts` | Parses raw Sentry envelopes (multi-item, length-prefixed payloads) |
| `transformers.ts` | Converts parsed items into typed `Report` / `Transaction` / `Log` objects |
| `localServerApi.ts` | Express handlers for `/api/{project}/store/` and `/api/{project}/envelope/` |
| `types.ts` | All public TypeScript interfaces (`Testkit`, `Report`, `Transaction`, `Span`, …) |

### Test files (`packages/sentry-testkit/__tests__/`)

| File | What it covers |
|------|---------------|
| `commonTests.ts` | Shared suite run by node, browser, and react tests |
| `node.test.ts` | Node.js integration |
| `browser.test.ts` | Browser (jsdom) integration |
| `react.test.tsx` | React integration |
| `puppeteer.test.ts` / `playwright.test.ts` | Browser automation integration |
| `local-server.test.ts` | Local server integration |
| `network-interception.test.ts` | Network interceptor |
| `jest-mock.test.ts` | Jest mock helper |
| `parsers.test.ts` | Envelope parser unit tests |
| `logs.test.ts` / `feedback.test.ts` / `checkins.test.ts` | Per-envelope-type capture |

Tests drive the **real** Sentry SDK — never mock it. See [Testing](skills/testing.md).

---

## Coding Conventions

> Summary only. Full rules with good/bad examples: [Code Writing](skills/code-writing.md) and [Code Quality](skills/code-quality.md).

- **TypeScript** throughout. `any` is acceptable only at the SDK boundary (transformer inputs) and must never leak into a public type.
- Prefer `const` over `let`; avoid `var`.
- Functions should have minimal side effects.
- Use clear, descriptive variable and function names.
- Do not add comments that explain *what* code does — name things well instead. Only comment *why* when the reason is non-obvious (a hidden constraint, a workaround for a specific bug).
- Do not add error handling or fallbacks for scenarios that cannot happen; trust TypeScript types and framework guarantees. The one exception is SDK payloads, which genuinely vary between Sentry v9 and v10 — use `?.` and `??` there.
- Do not introduce abstractions beyond what the task requires.
- `browser.ts` must never reach Node or Express modules, directly or transitively.

---

## Git Workflow

- **Rebase, never merge** when integrating with `master` (`git rebase origin/master`, not `git merge`).
- **Squash commits** — each PR should land as a single, well-formed commit on `master`.
- **No attribution trailers** — commit messages and PR descriptions must not contain `Co-Authored-By`, "Generated with", or any other AI-attribution lines. Commits are authored solely by the repository owner.
- Commit messages must follow **Conventional Commits**:
  ```
  <type>[optional scope]: <description>

  [optional body]

  [optional footer]
  ```
  Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `ci`, `build`.
- `fix:` → patch bump; `feat:` → minor bump; `feat!:` / `BREAKING CHANGE:` → major bump.

---

## Release Process

Fully automated via [release-please-action](https://github.com/googleapis/release-please-action). Do **not** manually edit `CHANGELOG.md` or bump versions in `package.json`. Merge well-typed conventional commits to `master` and release-please handles the rest.

---

## What to Avoid

- **Never use emojis.** Not in code, docs, READMEs, commit messages, PR titles/descriptions, issues, or chat responses. No exceptions.
- Do not push directly to `master` — open a PR.
- Do not use `yarn add` / `npm install` without confirming with the user.
- Do not edit `CHANGELOG.md` manually.
- Do not skip tests. All changes to `packages/sentry-testkit/` must pass `yarn test`.
- Do not add Node.js-specific imports (e.g. `express`, `http`) to `browser.ts` — it must be browser-safe.
- Do not mock the Sentry SDK in tests — drive the real SDK and assert on what the testkit captured.
- Do not use `@ts-ignore`, and avoid `as` casts in `src/` — `types.ts` compiles into every consumer's build.
- Do not commit `.env` files, secrets, or credentials.
