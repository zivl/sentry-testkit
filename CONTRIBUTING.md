# Contribution Guide

## Commit Message Guidelines

We use [conventionalcommits](https://conventionalcommits.org) to format our commit messages.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to generate the [Sentry Testkit release notes](https://github.com/wix/sentry-testkit/releases).

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

More info about message format and list of types could be found [here](https://conventionalcommits.org)

## Local Setup
1. `git clone git@github.com:wix/sentry-testkit.git`
2. `npm install`

## Writing Code
* Make sure to write functions with minimal side effects.
* We always prefer `const` on `let`.
* Make up clear and readable variable names and function names.
* Update documentation in case you add/modify/remove any kind of behaviour.
* Test any code that you push in. 

## Git Stuff
* Make sure you're rebased with `master` branch. Especially if you're working on a long feature.
* Your PRs will be merged after passing all relevant conditions (build, testing... etc.).

## Release

We use [standard-version](https://github.com/conventional-changelog/standard-version) to prepare the [CHANGELOG.md](./CHANGELOG.md) file and git tags (to have correct [release notes](https://github.com/wix/sentry-testkit/releases)).

Release process:
* merge all related PRs to master;
* checkout fresh master;
* fetch all tags `git fetch --all --tags`;
* generate changelog with `npm run release` - it will automatically
  * detect which semver number should be updated (depending on `conventionalcommits` format);
  * create new git `tag` with version;
  * commit the result to current branch.
* initiate `git push --follow-tags origin master && npm publish` to push changes of master branch and initiate package publishing;
