# Code Writing

Implementing features and fixes in `packages/sentry-testkit/src/`.

> Read this before writing code. Then [Code Quality](code-quality.md) and [Testing](testing.md) before you push.

---

## The one thing that bites everyone

**Envelope item types are dispatched in three independent places.** Adding support for a new Sentry envelope type means changing all three, or one integration mode silently drops the data and no test in the other modes will catch it.

| Site | Serves |
|------|--------|
| `src/parsers.ts` → `handleEnvelopeRequestData` | Local server mode, network interceptor |
| `src/testkit.ts` → `createRequestHandler` | Puppeteer, Playwright |
| `src/sentryTransport.ts` → `send` | Transport mode (Node, browser, React) |

A new type also needs: a `transformX` in `transformers.ts`, a public interface plus `x()` / `waitForX()` in `types.ts`, storage in `testkit.ts`, clearing in `reset()`, and a test per mode.

Checklist when adding an envelope type:

- [ ] `transformers.ts` — `transformX(raw): X`
- [ ] All three dispatch sites above
- [ ] `types.ts` — `X` interface, `x(): X[]`, `waitForX(count, options)`
- [ ] `testkit.ts` — array, accessor, `waitForX`, cleared in `reset()`
- [ ] Tests covering transport mode **and** at least one network-capture mode
- [ ] Docs: [Docs Writing](docs-writing.md)

---

## Boundaries: where `any` is allowed

Data arriving from the Sentry SDK is untrusted JSON whose shape varies across SDK versions. `any` is correct at that boundary and wrong everywhere after it. The rule is: **`any` in, typed out.** Transformers are the airlock.

**Good** — untyped input, typed output, raw payload preserved:

```ts
export function transformCheckIn(checkIn: any): CheckIn {
  return {
    checkInId: checkIn.check_in_id,
    monitorSlug: checkIn.monitor_slug,
    status: checkIn.status,
    originalCheckIn: checkIn,
  }
}
```

**Bad** — the `any` leaks into what users consume:

```ts
export function transformCheckIn(checkIn: any) {
  return { ...checkIn }   // return type is any; users get no autocomplete,
}                         // and snake_case internals become public API
```

Two rules the good example encodes:

- **Rename snake_case to camelCase.** Sentry's wire format is snake_case; our public API is camelCase. Mapping explicitly is what keeps wire-format churn from becoming a breaking change.
- **Always expose the raw payload** as `originalReport` / `originalLog` / `originalCheckIn`. It is the escape hatch for users who need a field we have not mapped yet, and it means an unmapped field is an inconvenience rather than a blocker.

---

## Entry-point split: `browser.ts` must stay Node-free

`src/index.ts` and `src/browser.ts` are separate published entry points (`sentry-testkit` and `sentry-testkit/browser`). `browser.ts` is bundled into browser test environments, where a Node import breaks the bundle.

**Bad** — breaks every webpack/vite consumer of the browser entry point:

```ts
// src/browser.ts
import http from 'http'
import { createLocalServerApi } from './localServerApi'  // pulls in express
```

**Good** — browser entry point exports only what works in a browser:

```ts
// src/browser.ts
import { createTestkit } from './testkit'
import { createSentryTransport } from './sentryTransport'
```

`express`, `body-parser`, `http` and anything importing them (`localServerApi.ts`) belong to `index.ts` only. Before adding an import to a file, check whether `browser.ts` reaches it transitively.

---

## Support both Sentry v9 and v10

CI runs the full suite against `@sentry/*` `^9.0.0` and `^10.0.0` on Node 18, 20, and 22. Code that reads a field only one major version emits will pass locally and fail in CI.

**Good** — tolerate absence, supply the documented default:

```ts
level: report.level || 'error',
tags: report.tags || {},
flags: report.contexts?.flags?.values ?? [],
```

**Bad** — assumes a shape that only one SDK version guarantees:

```ts
level: report.level,                    // undefined on SDKs that omit it
flags: report.contexts.flags.values,    // throws when contexts is absent
```

Use `??` for "absent means default" and `?.` for optional nesting. This is the one place where defensive coding is correct: the input genuinely varies, so it is not a hypothetical.

---

## Factory functions, not module state

Every part of the library is created through a `createX(testkit)` factory closing over its state. Calling `sentryTestkit()` twice must yield two fully independent testkits — users run test files in parallel, and shared module state would cross-contaminate their assertions.

**Good**:

```ts
export function createTestkit(): Testkit {
  let reports: Report[] = []
  return { reports: () => reports, reset: () => { reports = [] } }
}
```

**Bad** — every consumer in the process shares one array:

```ts
const reports: Report[] = []
export const reports = () => reports
```

Corollary: anything new that holds state gets a factory, and `reset()` must clear it.

---

## TypeScript settings you will actually notice

`tsconfig.json` is strict, plus three flags that change how everyday code is written:

**`noUncheckedIndexedAccess`** — indexing an array yields `T | undefined`. In tests, assert with `!` after checking length; in `src/`, handle the undefined case.

```ts
expect(testkit.reports()).toHaveLength(1)
const report = testkit.reports()[0]!   // length already asserted
```

**`noPropertyAccessFromIndexSignature`** — index-signature fields need bracket access.

```ts
log.attributes['userId']   // good
log.attributes.userId      // bad: does not compile
```

**`noUnusedLocals`** — an unused import or variable fails the build, not just the linter.

Also: `target` is `ES5` and `lib` includes `dom`, so a Node-only global is a type error in shared code. `parsers.ts` handles this by feature-detecting `Buffer` before falling back to `TextEncoder`, which is what lets the same parser run in Node and inside a Puppeteer page.

---

## General style

Mostly conventional; kept short deliberately.

- `const` over `let`; never `var`.
- Descriptive names. `parseEnvelope`, not `parse`. `handleEnvelopeRequestData`, not `handle`.
- Minimal side effects — functions take input and return output.
- No abstraction the current task does not need. Three similar lines beat a premature helper.
- No error handling for cases that cannot occur. Trust the types inside the library; validate only at the SDK boundary, where input really is unknown.
- **Comments explain *why*, never *what*.** If a comment restates the code, delete it.

**Good** — the comment carries information the code cannot:

```ts
// Log items are containers: their payload is { items: SerializedLog[] }
const logs = (payload && payload.items) || []
```

**Bad**:

```ts
// loop over the logs and push them
logs.forEach(log => testkit.logs().push(transformLog(log)))
```

Never use emojis — not in code, comments, commit messages, or output.
