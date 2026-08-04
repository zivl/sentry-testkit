# Skills

Task-scoped playbooks for anyone changing this repository — human contributors and AI coding agents alike (Claude Code, Codex, Cursor, Gemini CLI, Copilot, and others).

These are plain markdown with no tool-specific frontmatter, so any agent that reads [AGENTS.md](../AGENTS.md) or is pointed at a file path can consume them. [AGENTS.md](../AGENTS.md) stays the always-loaded baseline; these skills hold the detail you only need while doing that specific kind of work.

## The skills

One per phase of the change lifecycle. A typical change touches all five, in order.

| Skill | Load it when |
|-------|--------------|
| [Code Writing](code-writing.md) | Implementing a feature or fix in `packages/sentry-testkit/src/` |
| [Code Quality](code-quality.md) | Before opening a PR: formatting, lint, types, build |
| [Testing](testing.md) | Adding or changing tests in `packages/sentry-testkit/__tests__/` |
| [Docs Writing](docs-writing.md) | Public API changed, or docs under `packages/sentry-testkit-docs/` need updating |
| [Code Review](code-review.md) | Reviewing a PR or self-reviewing a diff before pushing |

## How to use them

**Humans**: read the one matching your task. The [PR template](../.github/PULL_REQUEST_TEMPLATE.md) checklist maps one-to-one onto them.

**Agents**: read the relevant skill file before starting that phase of work — do not rely on a summary. Each contains repo-specific rules that are not derivable from the code alone. When a skill and a general instinct conflict, the skill wins.

## Conventions used here

- **Good / Bad examples.** Every non-obvious rule carries a contrasting pair. The bad example is realistic code someone actually wrote, not a strawman.
- **Rules state their reason.** A rule you understand is a rule you can apply to a case it does not literally cover.
- **Repo-specific over generic.** Universal advice ("write clear names") is stated once and briefly. Space goes to the things unique to sentry-testkit: dual Sentry v9/v10 support, the browser/Node entry-point split, envelope parsing, in-memory capture.

## Maintaining these skills

Skills are living documents. Update one when you find a rule that was implicit, a review comment you have now made twice, or a bug class that slipped through. Keep them short — a skill nobody finishes reading enforces nothing.
