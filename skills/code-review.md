# Code Review

Reviewing a PR, or self-reviewing your own diff before pushing. Both use the same checklist — self-review first catches most of it.

---

## What matters most here

sentry-testkit is a devDependency in a very large number of test suites. That shapes what a reviewer should weight:

1. **Does it silently drop data?** The failure mode of this library is a test that passes because nothing was captured. Silent capture gaps outrank almost everything else.
2. **Does it break the published type contract?** `types.ts` compiles into every consumer's build. A narrowed type is a broken build for strangers.
3. **Does it work across the support matrix?** Sentry v9 and v10, Node 18/20/22, browser and Node entry points.
4. Then: correctness, tests, docs, style.

---

## Review in this order

### 1. Capture completeness

- **New envelope item type?** Verify all three dispatch sites changed: `parsers.ts` (`handleEnvelopeRequestData`), `testkit.ts` (`createRequestHandler`), `sentryTransport.ts` (`send`). Missing one means that integration mode drops the data silently and the other modes' tests still pass. This is the highest-value single check in this repo.
- Is the new state cleared in `reset()`?
- Is there a `waitForX` alongside the `x()` accessor?

### 2. Entry-point purity

- Does `browser.ts` — or anything it imports transitively — reach `express`, `body-parser`, `http`, or `localServerApi.ts`? That breaks every bundler consuming `sentry-testkit/browser`.

### 3. Types and semver

- Any change to `types.ts`: is the commit type right? Removed field, renamed field, newly-required field, or narrowed type means `feat!:` / `BREAKING CHANGE:`, not `feat:`.
- New `any` escaping a transformer into a public type?
- New `@ts-ignore` or `as` cast in `src/`?

### 4. SDK-version tolerance

- Does the code read a field without `?.` / `??` that only one Sentry major emits?
- Are snake_case wire fields mapped to camelCase, rather than spread through?

### 5. Tests

- Does the SDK get mocked instead of driven for real? Push back — see [Testing](testing.md).
- Bare `setTimeout` used as a wait? Flake.
- Missing `testkit.reset()` in `beforeEach`?
- Does the test actually fail without the fix? Ask the author to confirm they checked.
- Behavior common to node/browser/react duplicated per file instead of added to `commonTests.ts`?
- Any `.only` or `.skip` left in?

### 6. Docs

- Public API changed with no update to `docs/api/README.md`?
- Hand edits to `CHANGELOG.md`?

### 7. Hygiene

- Conventional commit with the right type; squashed to one commit; rebased on `master`.
- No AI-attribution trailers.
- No emojis anywhere.
- No stray `console.log`, no committed `.env` or secrets.

---

## How to write the comment

**Label severity.** The author cannot read your mind about what blocks merge.

| Prefix | Meaning |
|--------|---------|
| **Blocking** | Must change before merge |
| **Suggestion** | Worth doing, author's call |
| **Nit** | Cosmetic, never blocks |
| **Question** | Genuinely asking, not a veiled demand |

**Explain the consequence and propose the fix.** A comment that only identifies a problem makes the author do the diagnosis twice.

**Good**:

> **Blocking** — this adds `check_in` handling to `sentryTransport.ts` but not to `parsers.ts` or `testkit.ts`, so check-ins captured through the local server and Puppeteer modes will be dropped silently. The existing tests only cover transport mode, so they still pass. Mirroring the same branch into `handleEnvelopeRequestData` and `createRequestHandler` and adding a case to `local-server.test.ts` should cover it.

**Bad** — no severity, no consequence, no path forward, and aimed at the person:

> You forgot the other handlers. Why didn't you check this?

**More good/bad pairs:**

> **Nit** — `parse` reads as generic here; `parseEnvelope` matches the neighbors. Non-blocking.

versus:

> bad name

---

> **Suggestion** — `report.contexts.flags.values` will throw when `contexts` is absent, which happens on Sentry v9. `report.contexts?.flags?.values ?? []` matches how the other transformers handle it. CI runs the v9 matrix leg, so this should surface there.

versus:

> This will break.

---

## Reviewer conduct

- **Review the code, not the author.** "This drops data in Puppeteer mode", never "you always forget".
- **Approve when it is good enough**, not when it is what you would have written. Style preferences that lint does not enforce are nits.
- **Never debate formatting.** Prettier is the arbiter; if lint passes, the formatting is correct.
- **Say what is good.** A clean parser test or a well-chosen name is worth a sentence. Reviews that only ever criticize train people to dread them.
- **Ask when unsure.** "What happens if the envelope has no items?" is a better review comment than a wrong assertion.

## As the author

- Self-review the diff before requesting review. Most findings above are ones you can catch yourself.
- Answer every comment, even if only "done" or "leaving as-is because X".
- Push back with reasoning when you disagree — the reviewer may lack context. Reviews are a conversation, not a verdict.
