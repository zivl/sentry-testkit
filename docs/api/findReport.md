## findReport(error: Error) : SentryEvent | undefined

Finds a report by a given error.

**Arguments**<br>
* error: `Error` - An error object to look for in the reports

**Returns**: <code>SentryEvent</code> \| <code>undefined</code> - the report object if one found. `undefined` otherwise.

**See**: Uses [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

**See**: You may refer to the original definition of [<code>SentryEvent</code>](https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/index.ts) for further explanation and details.
