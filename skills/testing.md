# Testing

Writing and running tests in `packages/sentry-testkit/__tests__/`.

> Every change to `packages/sentry-testkit/` must ship with tests and pass `yarn test`. No exceptions.

---

## Running

```bash
yarn test
```

Narrower runs, from `packages/sentry-testkit/`:

```bash
yarn test -- node.test.ts
```

```bash
yarn test -- --testNamePattern="captures a log"
```

Jest sets `resetMocks: true`, so mocks reset between tests automatically — do not add manual reset boilerplate.

---

## The core principle: do not mock Sentry

This library exists to verify what the real Sentry SDK actually emits. A test that mocks the SDK verifies our idea of the SDK, which is exactly the thing that drifts between v9 and v10 and is exactly the bug class users hit.

**Good** — real SDK, real transport, assert on captured output:

```ts
import * as Sentry from '@sentry/node'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('sentry test-kit test suite - structured logs', function() {
  beforeAll(() =>
    Sentry.init({ dsn: DUMMY_DSN, enableLogs: true, transport: sentryTransport })
  )

  beforeEach(() => testkit.reset())

  test('captures a log with its level', async () => {
    Sentry.logger.info('user logged in')
    await Sentry.flush()

    expect(testkit.logs()).toHaveLength(1)
    expect(testkit.logs()[0]!.level).toBe('info')
  })
})
```

**Bad** — hand-built payload; passes forever while real capture is broken:

```ts
test('captures a log', () => {
  const fakeEnvelope = { type: 'log', items: [{ level: 'info', body: 'hi' }] }
  transport.send(fakeEnvelope)
  expect(testkit.logs()[0]!.level).toBe('info')
})
```

The one legitimate exception is `parsers.test.ts`, which unit-tests envelope parsing against raw fixture strings. That is testing the parser's contract with the wire format, not the SDK's behavior — and even there, the fixtures are copied from real envelopes.

---

## Always reset between tests

Captured data accumulates in memory for the life of the testkit instance. Without a reset, tests pass in isolation and fail when the file runs in a different order.

```ts
beforeEach(() => testkit.reset())
```

`Sentry.init()` belongs in `beforeAll` (initializing per test is slow and leaks scope state); `testkit.reset()` belongs in `beforeEach`. If a test manipulates the Sentry scope, clear that too — `commonTests.ts` clears breadcrumbs in `beforeEach` for exactly this reason.

---

## Waiting for async capture

Sentry delivers asynchronously. A synchronous assertion right after `captureException` is a flake waiting for a slow CI machine. Never use a bare `setTimeout` sleep.

Three correct tools, in order of preference:

**`await Sentry.flush()`** — deterministic, no polling. Use when the SDK controls delivery (transport mode).

```ts
Sentry.logger.info('user logged in')
await Sentry.flush()
expect(testkit.logs()).toHaveLength(1)
```

**`testkit.waitForX(count, options)`** — polls until `count` items arrive, then rejects with a descriptive message. Use when flushing is not available, and to assert timeout behavior.

```ts
const logs = await testkit.waitForLogs(1)
expect(logs[0]!.message).toBe('awaited log')
```

**`waitForExpect`** — for asserting a condition that is not simply a count.

```ts
await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
```

**Bad** — arbitrary sleep, flaky and slow:

```ts
Sentry.captureException(new Error('boom'))
await new Promise(resolve => setTimeout(resolve, 500))
expect(testkit.reports()).toHaveLength(1)
```

---

## Cover the integration modes

Each mode captures data through a different code path (see the three dispatch sites in [Code Writing](code-writing.md)). Passing in transport mode says nothing about Puppeteer.

| File | Mode |
|------|------|
| `commonTests.ts` | Shared suite, run by node/browser/react |
| `node.test.ts`, `browser.test.ts`, `react.test.tsx` | Transport |
| `puppeteer.test.ts`, `playwright.test.ts` | Browser automation |
| `local-server.test.ts` | Local Express server |
| `network-interception.test.ts` | Interceptor (nock) |
| `parsers.test.ts` | Envelope parsing unit tests |

**Behavior common to all modes goes in `commonTests.ts`**, which node, browser, and react each run against their own SDK. Adding a test there gets you three-platform coverage from one test.

```ts
export function createCommonTests({ Sentry, testkit }: { ... }) {
  test('should return report.message when using captureMessage', async function() {
    Sentry.captureMessage('hello')
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()[0]!.message).toEqual('hello')
  })
}
```

Mode-specific behavior goes in that mode's own file. A new envelope type needs coverage in transport mode plus at least one network-capture mode.

---

## Writing good assertions

**Assert on the mapped public field, not the raw payload.** The mapping is the thing under test; asserting through `originalReport` tests Sentry rather than us.

```ts
expect(log.attributes['userId']).toBe(42)     // good: tests our transform
expect(log.originalLog.attributes.userId.value).toBe(42)   // bad, unless
                                                            // originalLog IS the subject
```

**Assert specific values, not just existence.**

```ts
expect(report.level).toEqual('warning')       // good
expect(report.level).toBeDefined()            // bad: passes on the wrong level
```

**Name tests as behavior.** `'unwraps typed attributes to plain values'` tells a future reader what broke. `'test logs'` does not.

**Assert length before indexing** — `noUncheckedIndexedAccess` requires it, and it produces a far better failure message than a `TypeError` on `undefined`.

```ts
expect(testkit.logs()).toHaveLength(1)
const log = testkit.logs()[0]!
```

---

## Checklist

- [ ] Real Sentry SDK, not a mock
- [ ] `testkit.reset()` in `beforeEach`
- [ ] Async waits via `flush()` / `waitForX` / `waitForExpect` — never `setTimeout`
- [ ] Covers each integration mode the change touches
- [ ] Shared behavior added to `commonTests.ts`, not copy-pasted per platform
- [ ] Asserts specific values on public fields
- [ ] A regression test genuinely fails without the fix (verify by reverting it)
- [ ] No `.only` / `.skip` left behind
- [ ] `yarn test` green
