<p align="center">
    <img src="logo/Sentry_github.svg">
</p>


[![npm version](https://badge.fury.io/js/sentry-testkit.svg)](https://badge.fury.io/js/sentry-testkit)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=popout)
![Hackage-Deps](https://img.shields.io/hackage-deps/v/lens.svg)
[![Build Status](https://travis-ci.org/wix/sentry-testkit.svg?branch=master)](https://travis-ci.org/wix/sentry-testkit)

Sentry is a JavaScript SDK published by [Sentry.io](https://docs.sentry.io/clients/) to enable software flow tracking and issues reporting to the *Sentry* system.<br>
However, when building tests for your application, you want to assert that the right flow-tracking or error is being sent to *Sentry*, **but** without really sending it to the *Sentry* system. This way you won't swamp it with false reports during test running and other CI operations.

## Sentry Test Kit - to the rescue
Sentry test kit enables Sentry to work natively in your application, but it overrides the default Sentry transport mechanism so the report is not really sent but rather logged locally. In this way, the logged reports can be fetched later for usage verification or other uses you may have in your testing environment.

## Usage
### Installation
```
npm install Sentry-testkit --save-dev
```
### Instantiation
```javascript
// CommonJS
const testKitInitializer = require('sentry-testkit')

// ES6 Modules
import testKitInitializer from 'sentry-testkit'
```
### Using in tests
```javascript
const testKit = testKitInitializer(Sentry)

// any scenario that should call Sentry.catchException(...)

expect(testKit.reports()).toHaveLength(1)
const report = testKit.reports()[0]
expect(report).toHaveProperty('release', 'test')
```
#### Pass your own `shouldSendCallback` logic
```javascript
const shouldSendCallback = data => {
    return /* your own logic */
}
const testKit = testKitInitializer(Sentry, shouldSendCallback)
```

You may see more example usage in the testing section of this repository as well.

## Test Kit API
<a name="reports"></a>

### reports() : <code>Array</code>
Get all existing reports.

**Kind**: instance function
**Returns**: <code>Array</code> - where each member of the array consists of `Sentry`'s *data* object.
**See**: You may refer to the [Sentry Docs](https://docs.sentry.io/clients/) for further explanation and details.
<a name="reset"></a>

### reset() : <code>Array</code>
Reset the teskit state and clear all existing reports.

**Returns**: <code>Array</code> - empty array.
<a name="extractException"></a>

### extractException(report) : <code>Object</code>
Extract the exception object of a given report.

**Returns**: <code>Object</code> - the exception object as built by `Sentry`

| Param | Type | Description |
| --- | --- | --- |
| report | <code>Object</code> | report object. |

<a name="getExceptionAt"></a>

### getExceptionAt(index) : <code>Object</code>
Extract the exception object of a report in a specific position.

**Returns**: <code>Object</code> - the exception object as built by `Sentry`

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | index position of the report |

<a name="findReport"></a>

### findReport(error) : <code>Object</code> \| <code>undefined</code>
Find a report by a given error.

**Returns**: <code>Object</code> \| <code>undefined</code> - the report object if one found. `undefined` otherwise
**See**: Uses [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | error to look for in the reports |

<a name="isExist"></a>

### isExist(error) : <code>Boolean</code>
check whether a given error exist (i.e. has been reported)

**Returns**: <code>Boolean</code> - `true` if the error exists. `false` otherwise

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | the error to look for in the reports |

## Gotcha(s)
* if you set the `shouldSendCallback` hook in your `Sentry` configuration, make sure to call the `testKitInitializer(Sentry)` function **after** your code has finished configuring Sentry. You need to do this because we call `Sentry.setShouldSendCallback` to ensure the proper functionality of the `Sentry` lifecycle so you need to call the `testKitInitializer(Sentry)` only after `Sentry` is configured.<br>
See the documentation above if you want to pass your own `shouldSendCallback` logic to `Sentry-testkit`.
* Configure Sentry to allow duplicates as otherwise the same dummy error will only be reported once. `Sentry.config(dummyDsn, { allowDuplicates: true })` ([Documentation](https://docs.sentry.io/clients/javascript/config/?platform=javascript))
