# Contribution Guide

## Commit Message Guidelines

We use [conventionalcommits](https://conventionalcommits.org) to format our commit messages. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to generate the [Sentry Testkit release notes](https://github.com/zivl/sentry-testkit/releases).

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

More info about message format and list of types could be found [here](https://conventionalcommits.org)

## Local Setup

1. `git clone git@github.com:zivl/sentry-testkit.git`
2. `yarn install`

## Writing Code

- Make sure to write functions with minimal side effects.
- We always prefer `const` on `let`.
- Make up clear and readable variable names and function names.
- Update documentation in case you add/modify/remove any kind of behaviour.
- Test any code that you push in.

## Git Stuff

- Make sure you're rebased with `master` branch. Especially if you're working on a long feature.
- Your PRs will be merged after passing all relevant conditions (build, testing... etc.).

## Release

Releases are fully automated via [release-please-action](https://github.com/googleapis/release-please-action).

Release process:

- merge all related PRs to `master` using conventional commit messages;
- release-please automatically opens a **Release PR** that bumps the version in `package.json` and updates `CHANGELOG.md`;
- once the Release PR is merged, release-please creates a GitHub release and a git tag;
- the CI workflow then builds, tests, and publishes the package to npm automatically.

No manual steps are required. The version bump is determined by the commit types on `master`:

| Commit type | Version bump |
|-------------|-------------|
| `fix:` | patch |
| `feat:` | minor |
| `feat!:` / `BREAKING CHANGE:` | major |
