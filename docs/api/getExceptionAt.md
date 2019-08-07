## getExceptionAt(index: Number) : ReportError
Extracts the exception object of a report in a specific position.

**Arguments**<br>
* index : `Number` - index position of the report.

**Returns**: `ReportError`.

**See**: You may refer to the definition of [<code>ReportError</code>](/api/reportError.md) for further explanation and details.

### Example
```javascript
test('getExceptionAt example', async function() {
    Sentry.captureException(new Error('testing get exception at index 0'))
    Sentry.captureException(new Error('testing get exception at index 1'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(2))
    const { message } = testkit.getExceptionAt(1)
    expect(message).toEqual('testing get exception at index 1')
})
```
