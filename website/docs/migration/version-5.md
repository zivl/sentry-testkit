# Version 5 Migration Guide

Let's start with the good news: **the are no significant breaking changes.**

## Moving Sentry Testkit to [TypeScript](https://www.typescriptlang.org/)
We refactored our entire code base to support TypeScript language. We have done so for the following reasons:
* Type safe system. Eventually there is a great advantage to work in a type-safe ecosystem.
* By having type safe functionality, we beleive it will encourage more deveopers to understand the code and be able to contribute more features and bug fixes.
* Using TypeScript also helps code editors (IDEs) to provide better code-auto-completion functionality as well as self-documenting function parameters and etc.

## (Maybe) Breaking Changes [UPDATE: Fixed!]
Unfortunately, due to some race condition or wrong definition, we can't get to run out tests on the built-in `jest-mock` functionality.
To remind, it was possible if you're using `Jest` for testing, all you have to do in your `***.spec.js` file is to import the Jest mock as follows:
```javascript
// some.spec.js
import { testkit } from 'sentry-testkit/dist/jestMock';

test('something', function () {
    // click
    // clack
    // BOOM!
    expect(testkit.reports().length).toBeGreaterThan(0);
});
```
But we're having issue with that:
1. We're getting errors `Sentry is not defined` and `Maximum call stack size exceeded` (looks like circular dep): https://github.com/zivl/sentry-testkit/runs/2477315004
3. re-declaring block-scope variables (looks like es imports helps with this, but then we got into first problem): https://github.com/zivl/sentry-testkit/pull/78/checks?check_run_id=2826583066

You may refer to the source code of [`jestMock.ts`](https://github.com/zivl/sentry-testkit/blob/master/src/jestMock.ts) and we'll be happy for your help and suggestions.

For further details and discussion, please follow [issue #136](https://github.com/zivl/sentry-testkit/issues/136)

**[UPDATE]**: Thanks to [@liamjones](https://github.com/liamjones)'s contribution, this issue is no longer exists and you maybe upgrade your `sentry-testkit` versions safely!
