Represents a report event. The object has the following keys:

#### `breadcrumbs` [array]
Default: `[]`\
An array of [`Breadcrumb`](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/breadcrumb.ts) objects


#### `error` [[`ReportError`](/api/reportError.md)]
Default: `undefined`\
A [`ReportError`](/api/reportError.md) object

The error will be defined when using `Sentry.captureException`.

#### `message` [any]
Default: `undefined`\
The message key will be defined when using `Sentry.captureMessage`.

#### `extra` [any]
Default: `undefined`\
The extra context provided by `scope.setExtra`.

#### `tags` [object]
Default: `{}`\
The tags provided by `scope.setTag`.

#### `level` [[Severity](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/severity.ts)]
Default: `Severity.Error`\
The level of the report provided by `scope.setLevel`.

#### `release` [string]
Default: `undefined`\
The release string provided by `scope.setRelease`.

#### `user` [[User](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/user.ts)]
Default: `undefined`\
The user provided by `scope.setUser`.

#### `originalReport` [[SentryEvent](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/event.ts)]
Default: `object`\
Sentry's original report object.