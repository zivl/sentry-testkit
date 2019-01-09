## reset() : void

Resets the testkit state and clear all existing reports.

### Example
```javascript
test('reset example', async function() {
    Sentry.captureException(new Error('Sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()).toHaveLength(1)
    testkit.reset()
    expect(testkit.reports()).toHaveLength(0)
})
```
