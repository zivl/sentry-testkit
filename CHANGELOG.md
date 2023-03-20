# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.0.5](https://github.com/zivl/sentry-testkit/compare/v5.0.4...v5.0.5) (2023-01-04)


### Bug Fixes

* local server not capturing error events from the browser ([#152](https://github.com/zivl/sentry-testkit/issues/152)) ([6e43809](https://github.com/zivl/sentry-testkit/commit/6e438099872e0bd5402bb5235cea8969091bd857))
* support all content types in local server endpoints ([#153](https://github.com/zivl/sentry-testkit/issues/153)) ([063a538](https://github.com/zivl/sentry-testkit/commit/063a538ab657a9674ac42fa7588cf02564ea6cf8))
* support all content types in local server endpoints ([#161](https://github.com/zivl/sentry-testkit/issues/161)) ([d5d0685](https://github.com/zivl/sentry-testkit/commit/d5d0685e561f7bd3ed387c745365ef64593eb36b))

### [5.0.4](https://github.com/zivl/sentry-testkit/compare/v5.0.3...v5.0.4) (2022-12-04)


### Bug Fixes

* default export when importing in pure node ESM ([#145](https://github.com/zivl/sentry-testkit/issues/145)) ([42aa0cc](https://github.com/zivl/sentry-testkit/commit/42aa0cc49f85aca17708a9fc8e10cd590240b348))

### [5.0.3](https://github.com/zivl/sentry-testkit/compare/v5.0.2...v5.0.3) (2022-10-21)


### Bug Fixes

* SentryTransport factory function return "any" until TS issue will be fixed ([#141](https://github.com/zivl/sentry-testkit/issues/141)) ([a1d07ca](https://github.com/zivl/sentry-testkit/commit/a1d07ca56b3c672968c9a1e119d25137f6122194)), closes [#138](https://github.com/zivl/sentry-testkit/issues/138)

### [5.0.2](https://github.com/zivl/sentry-testkit/compare/v5.0.1...v5.0.2) (2022-10-21)


### Bug Fixes

* empty export of TS types ([#140](https://github.com/zivl/sentry-testkit/issues/140)) ([a4a621e](https://github.com/zivl/sentry-testkit/commit/a4a621e381bb0af830e29211d7cad2201f872d11)), closes [#138](https://github.com/zivl/sentry-testkit/issues/138)

### [5.0.1](https://github.com/zivl/sentry-testkit/compare/v5.0.0...v5.0.1) (2022-10-21)


### Bug Fixes

* point to correct TS types declaration file ([#139](https://github.com/zivl/sentry-testkit/issues/139)) ([8eb394f](https://github.com/zivl/sentry-testkit/commit/8eb394f7b2ee9de9569a3ec825398cde2cdb6b9d)), closes [#138](https://github.com/zivl/sentry-testkit/issues/138)

## [5.0.0](https://github.com/zivl/sentry-testkit/compare/v4.1.0...v5.0.0) (2022-10-20)


### ⚠ BREAKING CHANGES

* move case base to typescript (#137)

* move case base to typescript ([#137](https://github.com/zivl/sentry-testkit/issues/137)) ([0c45d14](https://github.com/zivl/sentry-testkit/commit/0c45d147f7f1720d0d4985c34f2ea2df3009f59b)), closes [#114](https://github.com/zivl/sentry-testkit/issues/114)

## [4.1.0](https://github.com/zivl/sentry-testkit/compare/v4.0.3...v4.1.0) (2022-09-30)


### Features

* allow CORS requests ([#121](https://github.com/zivl/sentry-testkit/issues/121)) ([29720b5](https://github.com/zivl/sentry-testkit/commit/29720b5632a60f56459fa39ed8d79b23f4012d5f))

### [4.0.3](https://github.com/zivl/sentry-testkit/compare/v4.0.2...v4.0.3) (2022-08-03)


### Bug Fixes

* accept text/plain data ([#119](https://github.com/zivl/sentry-testkit/issues/119)) ([b491bcb](https://github.com/zivl/sentry-testkit/commit/b491bcb03760dd3af1085736973a2bed97755b36)), closes [#104](https://github.com/zivl/sentry-testkit/issues/104)
* **types:** Add missing generic type arg to default export ([#118](https://github.com/zivl/sentry-testkit/issues/118)) ([08648ab](https://github.com/zivl/sentry-testkit/commit/08648ab87e4ebe15ef0bfb88536eed5585ccbc30))

### [4.0.2](https://github.com/zivl/sentry-testkit/compare/v4.0.1...v4.0.2) (2022-07-28)


### Bug Fixes

* **types:** Update to support new V7 transport style ([#116](https://github.com/zivl/sentry-testkit/issues/116)) ([ebdb751](https://github.com/zivl/sentry-testkit/commit/ebdb751e9fce446b46f8a55fc76e627df2834b8d))

### [4.0.1](https://github.com/zivl/sentry-testkit/compare/v4.0.0...v4.0.1) (2022-07-07)

## [4.0.0](https://github.com/zivl/sentry-testkit/compare/v3.3.8...v4.0.0) (2022-07-07)


### Features

* add support for API v7 ([#109](https://github.com/zivl/sentry-testkit/issues/109)) ([07e6d02](https://github.com/zivl/sentry-testkit/commit/07e6d02ac713bfc886623737791da129fc1ee18e))

### [3.3.8](https://github.com/zivl/sentry-testkit/compare/v3.3.7...v3.3.8) (2022-06-29)

### [3.3.7](https://github.com/zivl/sentry-testkit/compare/v3.3.6...v3.3.7) (2021-10-27)

### [3.3.6](https://github.com/zivl/sentry-testkit/compare/v3.3.5...v3.3.6) (2021-10-18)

### [3.3.5](https://github.com/zivl/sentry-testkit/compare/v3.3.4...v3.3.5) (2021-10-13)

### Bug Fixes
* items other than transform sent in an envelope request cause an error ([#89](https://github.com/zivl/sentry-testkit/issues/89))

### [3.3.4](https://github.com/zivl/sentry-testkit/compare/v3.3.2...v3.3.4) (2021-06-20)


### Bug Fixes

* typo in usage section of README ([#79](https://github.com/zivl/sentry-testkit/issues/79)) ([c756be7](https://github.com/zivl/sentry-testkit/commit/c756be7c7a2b93970709aa5d7e91cf30111ed78d))

### [3.3.3](https://github.com/zivl/sentry-testkit/compare/v3.3.2...v3.3.3) (2021-06-18)

### [3.3.2](https://github.com/zivl/sentry-testkit/compare/v3.3.0...v3.3.2) (2021-02-22)

## [3.3.0](https://github.com/zivl/sentry-testkit/compare/v3.2.4...v3.3.0) (2021-02-04)


### Features

* add ready-to-use jest mock with testkit builtin ([80e602c](https://github.com/zivl/sentry-testkit/commit/80e602c2597464c80721993e73c251d65b03ad22))

### [3.2.4](https://github.com/zivl/sentry-testkit/compare/v3.2.3...v3.2.4) (2021-01-29)

### 3.2.3 (2021-01-29)
