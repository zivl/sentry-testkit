Represents a report event. The object has the following keys:

#### `breadcrumbs` [array]
Default: `[]`\
An array of [`Breadcrumb`](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/breadcrumb.ts) objects


#### `error` [object]
Default: `undefined`\
An error object with the following keys:

`name`: `string`\
`message`: `string`\
`stacktrace`: [StackFrame[]](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/stackframe.ts)

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

#### `originalReport` [[SentryEvent](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/index.ts)]
Default: `object`\
Sentry's original report object.