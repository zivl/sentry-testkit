<p align="center">
    <img src="logo/raven-testkit-logo.png"><br>
    <span size="28">Raven TestKit</span>
</p>



[![npm version](https://badge.fury.io/js/raven-testkit.svg)](https://badge.fury.io/js/raven-testkit)

Raven is a JavaScript SDK published by [Sentry.io](https://docs.sentry.io/clients/) to enable software flow tracking and issues reporting to the *Sentry* system.<br>
However, when building tests for your application, you want to assert that the right flow-tracking or error is being sent to *Sentry*, **but** without really sending it to the *Sentry* system. This way you won't swamp it with false reports during test running and other CI operations.

## Raven Test Kit - to the rescue
Raven test kit enables Raven to work natively in your application, but it overrides the default Raven transport mechanism so the report is not really sent but rather logged locally. In this way, the logged reports can be fetched later for usage verification or other uses you may have in your testing environment.

## Usage
### Installation
```
npm install raven-testkit --save-dev
```
### Instantiation
```javascript
// CommonJS
const testKitInitializer = require('raven-testkit')

// ES6 Modules
import testKitInitializer from 'raven-testkit'
```
### Using in tests
```javascript
const testKit = testKitInitializer(Raven)

// any scenario that should call Raven.catchException(...)

expect(testKit.reports()).to.have.lengthOf(1)
const report = testKit.reports()[0]
expect(report).to.have.property('release').to.equal('test')
```
#### Pass your own `shouldSendCallback` logic
```javascript
const shouldSendCallback = data => {
    return /* your own logic */
}
const testKit = testKitInitializer(Raven, shouldSendCallback)
```

You may see more example usage in the testing section of this repository as well.

## Test Kit API
<a name="reports"></a>

### reports() : <code>Array</code>
Get all existing reports.

**Kind**: instance function
**Returns**: <code>Array</code> - where each member of the array consists of `Raven`'s *data* object.
**See**: You may refer to the [Sentry Docs](https://docs.sentry.io/clients/) for further explanation and details.
<a name="reset"></a>

### reset() : <code>Array</code>
Reset the teskit state and clear all existing reports.

**Kind**: instance function
**Returns**: <code>Array</code> - empty array.
<a name="extractException"></a>

### extractException(report) : <code>Object</code>
Extract the exception object of a given report.

**Kind**: instance function
**Returns**: <code>Object</code> - the exception object as built by `Raven`

| Param | Type | Description |
| --- | --- | --- |
| report | <code>Object</code> | report object. |

<a name="getExceptionAt"></a>

### getExceptionAt(index) : <code>Object</code>
Extract the exception object of a report in a specific position.

**Kind**: instance function
**Returns**: <code>Object</code> - the exception object as built by `Raven`

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | index position of the report |

<a name="findReport"></a>

### findReport(error) : <code>Object</code> \| <code>undefind</code>
Find a report by a given error.

**Kind**: instance function
**Returns**: <code>Object</code> \| <code>undefind</code> - the report object if one found. `undefined` otherwise
**See**: Uses [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | error to look for in the reports |



## Gotcha(s)
* if you set the `shouldSendCallback` hook in your `Raven` configuration, make sure to call the `testKitInitializer(Raven)` function **after** your code has finished configuring Raven. You need to do this because we call `Raven.setShouldSendCallback` to ensure the proper functionality of the `Raven` lifecycle so you need to call the `testKitInitializer(Raven)` only after `Raven` is configured.<br>
See the documentation above if you want to pass your own `shouldSendCallback` logic to `raven-testkit`.
