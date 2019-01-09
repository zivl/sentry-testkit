## isExist(error: Error) : Boolean
Checks whether a given error exist (i.e. has been reported)

**Arguments**<br>
* error: `Error` - An error object to look for in the reports

**Returns**: `Boolean` - `true` if the error exists. `false` otherwise.

### Example
```javascript
 test('isExist example', async function() {
    const err = new Error('error to look for')
    Sentry.captureException(err)
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.isExist(err)).toBe(true)
})
```
