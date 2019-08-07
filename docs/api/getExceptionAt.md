## getExceptionAt(index: Number) : SentryEvent
Extracts the exception object of a report in a specific position.

**Arguments**<br>
* index : `Number` - index position of the report.

**Returns**: <code>SentryEvent</code> - the exception object as built by *Sentry*.

**See**: You may refer to the definition of [<code>Report</code>](/api/report.md) for further explanation and details.

### Example
```javascript
test('getExceptionAt example', async function() {
    Sentry.captureException(new Error('testing get exception at index 0'))
    Sentry.captureException(new Error('testing get exception at index 1'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(2))
    const { value } = testkit.getExceptionAt(1)
    expect(value).toEqual('testing get exception at index 1')
})
```
