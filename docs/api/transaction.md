Represents a transaction event. The object has the following keys:

#### `name` [string]
Default: `undefined`\
The `name` field of the transaction.

#### `traceId` [string]
The id of the trace the transaction is associated with.

#### `release` [string]
Default: `undefined`\
The release string provided by `scope.setRelease`.

#### `tags` [object]
Default: `{}`\
The tags provided by `scope.setTag`.

#### `extra` [any]
Default: `undefined`\
The extra context provided by `scope.setExtra`.

#### `spans` [array]
Default: `[]`\
An array of child [`Span`](/api/span.md) objects for this transaction
