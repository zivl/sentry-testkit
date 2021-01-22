# Contribution Guide

## Local Setup
1. `git clone git@github.com:wix/sentry-testkit.git`
2. `npm install`

## Writing Code
* Make sure to write functions with minimal side effects.
* We always prefer `const` on `let`.
* Make up clear and readible variable names and function names.
* Update documentation in case you add/modify/remove any kind of behaviour.
* Test any code that you push in. 

## Git Stuff
* Make sure you're rebased with `master` branch. Especially if you're working on a long feature.
* Your PRs will be merged after passing all relevant conditions (build, testing... etc.).
