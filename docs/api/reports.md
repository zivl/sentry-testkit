## reports() : Array
Gets all existing reports.

**Returns**: <code>Array</code> - where each member of the array consists of *Sentry's* <code>Report</code> type.

**See**: You may refer to the definition of [<code>Report</code>](/api/report.md) for further explanation and details.

### Example
```javascript
test('reports example', async function() {
    // Some scenario that will report the exceptions...

    await waitForExpect(() => expect(testkit.reports().length).toBeGreaterThan(0))
    const reports = testkit.reports()

    // Do what ever you want with the reports list
})
```
