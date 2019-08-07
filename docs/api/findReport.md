## findReport(error: Error) : Report | undefined

Finds a report by a given error.

**Arguments**<br>
* error: `Error` - An error object to look for in the reports

**Returns**: <code>Report</code> \| <code>undefined</code> - the report object if one found. `undefined` otherwise.

**See**: Uses [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

**See**: You may refer to the definition of [<code>Report</code>](/api/report.md) for further explanation and details.

### Example
```javascript
test('findReport example', async function() {
    const err = new Error('error to look for')

    // Some faulty scenario that will report err

    const report = testkit.findReport(err)
    expect(report).toBeDefined()
})
```
