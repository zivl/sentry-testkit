# Changelog

## [7.1.0](https://github.com/zivl/sentry-testkit/compare/sentry-testkit-v7.0.2...sentry-testkit-v7.1.0) (2026-07-19)


### Features

* **playwright:** add Playwright integration via testkit.playwright ([#325](https://github.com/zivl/sentry-testkit/issues/325)) ([ac1cbb1](https://github.com/zivl/sentry-testkit/commit/ac1cbb14530efa26adb4b9973f83dc22afb623c7)), closes [#312](https://github.com/zivl/sentry-testkit/issues/312)

## [7.0.2](https://github.com/zivl/sentry-testkit/compare/sentry-testkit-v7.0.1...sentry-testkit-v7.0.2) (2026-07-16)


### Miscellaneous Chores

* trigger 7.0.2 release ([e39b4ba](https://github.com/zivl/sentry-testkit/commit/e39b4ba3b4ee0cff1eea7872a85477441d88ce9c))

## [7.0.1](https://github.com/zivl/sentry-testkit/compare/sentry-testkit-v7.0.0...sentry-testkit-v7.0.1) (2026-07-16)


### Miscellaneous Chores

* trigger 7.0.1 release ([4fb23a5](https://github.com/zivl/sentry-testkit/commit/4fb23a53e0187d9b5cf700fca94c6749ed5bd6c8))

## [7.0.0](https://github.com/zivl/sentry-testkit/compare/sentry-testkit-v6.4.1...sentry-testkit-v7.0.0) (2026-07-15)


### ⚠ BREAKING CHANGES

* **logs:** drop support for sentry@8. The Sentry.logger API and the LogSeverityLevel type used by testkit.logs() only exist in @sentry/* v9+. The CI test matrix now covers sentry ^9 and ^10 only.

### Features

* **logs:** capture structured logs via testkit.logs() ([392f4e4](https://github.com/zivl/sentry-testkit/commit/392f4e4de071a5295482a304e8c1a0f81f18e0b6)), closes [#300](https://github.com/zivl/sentry-testkit/issues/300)
* **testkit:** add waitFor assertions, query helpers, and report.flags ([ace7ad2](https://github.com/zivl/sentry-testkit/commit/ace7ad25713499ac64b30e6e5a6e2097d8364e7c)), closes [#309](https://github.com/zivl/sentry-testkit/issues/309) [#310](https://github.com/zivl/sentry-testkit/issues/310) [#311](https://github.com/zivl/sentry-testkit/issues/311)


### Bug Fixes

* **parser:** support multi-item envelopes ([554b43d](https://github.com/zivl/sentry-testkit/commit/554b43d47fdc3c393afa1dd99f44a95202071590)), closes [#299](https://github.com/zivl/sentry-testkit/issues/299)

## [6.4.1](https://github.com/zivl/sentry-testkit/compare/sentry-testkit-v6.4.0...sentry-testkit-v6.4.1) (2026-04-16)


### Bug Fixes

* expose import/default conditions in package exports ([#278](https://github.com/zivl/sentry-testkit/issues/278)) ([26f7a0e](https://github.com/zivl/sentry-testkit/commit/26f7a0efa28577ef5c0e8b8cdbac337a41e5e7ef))
