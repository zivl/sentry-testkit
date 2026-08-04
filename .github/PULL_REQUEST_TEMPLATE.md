<!--
Thanks for contributing to sentry-testkit.

The checklist below mirrors the skills in /skills — each item links to the
guidance behind it. Skills are written for both human contributors and AI
coding agents, so the same standards apply either way.
-->

## What does this change?

<!-- One or two sentences. Link the issue it closes, e.g. "Closes #123". -->

## Why?

<!-- The motivation or the bug being fixed. Skip if it is obvious from the above. -->

## Type of change

- [ ] `fix:` — bug fix (patch)
- [ ] `feat:` — new feature (minor)
- [ ] `feat!:` / `BREAKING CHANGE:` — breaking change (major)
- [ ] `docs:` / `chore:` / `refactor:` / `test:` / `ci:` / `build:` — no release impact

## Checklist

**[Code](https://github.com/zivl/sentry-testkit/blob/master/skills/code-writing.md)**
- [ ] New envelope item type? All three dispatch sites updated (`parsers.ts`, `testkit.ts`, `sentryTransport.ts`)
- [ ] `browser.ts` still imports nothing from Node or Express
- [ ] Works on both `@sentry/*` v9 and v10

**[Quality](https://github.com/zivl/sentry-testkit/blob/master/skills/code-quality.md)**
- [ ] `yarn lint` passes
- [ ] `yarn build` passes (this is the type check)
- [ ] No new `@ts-ignore` or `as` casts in `src/`
- [ ] Commit type above matches the actual semver impact of any `types.ts` change

**[Tests](https://github.com/zivl/sentry-testkit/blob/master/skills/testing.md)**
- [ ] `yarn test` passes
- [ ] Tests added or updated, driving the real Sentry SDK rather than a mock
- [ ] Covers each integration mode the change affects
- [ ] Verified the new test fails without the change

**[Docs](https://github.com/zivl/sentry-testkit/blob/master/skills/docs-writing.md)**
- [ ] Public API change reflected in `packages/sentry-testkit-docs/docs/api/README.md`
- [ ] Migration note added for breaking changes
- [ ] `CHANGELOG.md` not edited by hand

**Hygiene**
- [ ] Rebased on `master` and squashed to a single conventional commit
- [ ] No emojis, no AI-attribution trailers, no stray `console.log`
