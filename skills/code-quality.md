# Code Quality

Formatting, linting, type safety, and the build. Everything that must be green before a PR.

> Run these after [Code Writing](code-writing.md), before [Code Review](code-review.md).

---

## The gate

Run all three from the repo root. All must pass.

```bash
yarn lint && yarn build && yarn test
```

| Command | What it actually does | Fails on |
|---------|----------------------|----------|
| `yarn lint` | ESLint over `src` and `__tests__`, enforcing Prettier | Any formatting deviation |
| `yarn build` | `tsc` — this is the type check, there is no separate one | Any type error |
| `yarn test` | Jest, full suite | Any failing test |

To auto-fix formatting instead of just reporting it:

```bash
yarn workspace sentry-testkit lint:fix
```

`yarn build` is the type check. There is no `typecheck` script — do not skip the build assuming your editor already caught everything, because `noUnusedLocals` and `noUncheckedIndexedAccess` surface errors that editors often show only as hints.

---

## Formatting is not negotiable, and not manual

The only ESLint rule configured is `prettier/prettier`, set to `error`. Formatting *is* the lint suite. Settings from `.prettierrc`:

| Setting | Value |
|---------|-------|
| `semi` | `false` — no semicolons |
| `singleQuote` | `true` |
| `tabWidth` | `2` |
| `trailingComma` | `es5` |

**Good**:

```ts
const dsn = 'https://key@sentry.io/1'
const items = [transformReport(payload), transformLog(payload)]
```

**Bad** — three lint errors:

```ts
const dsn = "https://key@sentry.io/1";
const items = [ transformReport(payload), transformLog(payload) ];
```

Never hand-format to match. Run the fixer. Never argue formatting in review — if it passed lint, it is correct by definition.

---

## Do not weaken the type system to make an error go away

The strict flags in `tsconfig.json` exist because this library ships `.d.ts` files that thousands of consumers type against. Suppressing an error locally exports the weakness to them.

**Bad** — silences the checker without fixing anything:

```ts
const report = testkit.reports()[0] as Report        // lies if the array is empty
// @ts-ignore
const value = log.attributes.userId
```

**Good** — satisfy the checker honestly:

```ts
expect(testkit.reports()).toHaveLength(1)
const report = testkit.reports()[0]!                 // length asserted on the line above
const value = log.attributes['userId']               // noPropertyAccessFromIndexSignature
```

Rules:

- **`!` is acceptable only when the immediately preceding line proves non-emptiness** (a length assertion in a test). Everywhere else, handle `undefined`.
- **`@ts-ignore` is not acceptable.** Use `@ts-expect-error` if a suppression is genuinely unavoidable — it fails the build once the underlying issue is fixed, so it cannot rot silently. Existing uses in `src/` are for real SDK-version incompatibilities; match that bar.
- **`as` casts are a smell** in `src/`. Prefer narrowing, or fix the type.

---

## Public API changes are semver events

`types.ts` is the published contract. `dist/index.d.ts` is generated from it and is what every consumer compiles against.

| Change | Commit type | Bump |
|--------|-------------|------|
| New optional field, new method | `feat:` | minor |
| Bug fix, no signature change | `fix:` | patch |
| Removed/renamed field, required param, narrowed type | `feat!:` or `BREAKING CHANGE:` | major |

Making an existing optional field required is breaking. Adding a required parameter to an existing method is breaking. When in doubt, make the new thing optional.

The version bump is derived from the commit message by release-please. **Never** hand-edit `CHANGELOG.md` or the `version` in `package.json`.

---

## Runtime compatibility

- **Node 18, 20, and 22** — CI runs all three. `.nvmrc` pins 22.12.0 for local development, so a Node 20+ API will work on your machine and fail CI on 18.
- **`@sentry/*` v9 and v10** — CI runs both. See the dual-version guidance in [Code Writing](code-writing.md).
- **Browser** — `tsconfig` targets ES5 with `dom` in `lib`. Node globals are not available in browser-reachable code.

That is a six-cell matrix. Local green is necessary, not sufficient.

---

## Dependencies

- **Do not run `yarn add` / `npm install` without confirming with the maintainer first.** This package is a devDependency in a very large number of test suites; every runtime dependency it takes on is one they inherit.
- Runtime dependencies are currently `express` and `body-parser`, used only by the Node entry point. Prefer a `devDependency`, and prefer no dependency at all.
- Never commit `.env` files, secrets, or credentials.

---

## Before you open the PR

- [ ] `yarn lint` clean
- [ ] `yarn build` clean
- [ ] `yarn test` green
- [ ] No `@ts-ignore`, no new `as` casts in `src/`
- [ ] No `.only` or `.skip` left in tests
- [ ] No `console.log` left behind
- [ ] Commit message is a valid conventional commit with the right type for the semver impact
- [ ] Rebased on `master`, squashed to a single commit
- [ ] No AI-attribution trailers (`Co-Authored-By`, "Generated with") in the commit or PR body
- [ ] No emojis anywhere
