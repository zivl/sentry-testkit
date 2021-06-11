## transactions() : Array
Gets all existing transactions.

**Returns**: <code>Array</code> - where each member of the array consists of a <code>Transaction</code> type.

**See**: You may refer to the definition of [<code>Transaction</code>](/api/transaction.md) for further explanation and details.

### Example
```javascript
test('transactions example', async function() {
    // Some scenario that will create a transaction...

    await waitForExpect(() => expect(testkit.transactions().length).toBeGreaterThan(0))
    const transactions = testkit.transactions()

    // Do what ever you want with the transactions
})
```
