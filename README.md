# raven-testkit

[![npm version](https://badge.fury.io/js/raven-testkit.svg)](https://badge.fury.io/js/raven-testkit)

Raven is a JavaScript SDK published by [Sentry.io](https://docs.sentry.io/clients/) to enable software flow tracking and issues reporting to the *Sentry* system.<br>
However, when building tests for your application, you want to assert that the right flow-tracking or error is being sent to *Sentry*, **but** without really sending it to the *Sentry* system. This way you won't swamp it with false reports during test running and other CI operations.

## Raven Test Kit - to the rescue
Raven test kit enables Raven to work natively in your application, but it overrides the default Raven transport mechanism so the report is not really sent but rather logged locally. In this way, the logged reports can be fetched later for verification usage or other uses you may have in your testing environment.

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

### Test Kit API
*reports ()*<br>
returns `Array`, where each member of the array consists of `Raven`'s *data* object.<br>
You may refer to the [Sentry Docs](https://docs.sentry.io/clients/) for further explanation and details.

*extractException (report: Object)*<br>
Extracts the `exception` out of a given `report` object.

*getExceptionAt (index: Number)*<br>
Extracts the `exception` out of a `report` object at a given index.

*findReport (error: Error)*<br>
Finds a report with the given `Error` object. Returns the `report` object if found, `undefined` otherwise.

*reset ()*<br>
Resets and clears the current test-kit instance logs.

## Gotcha(s)
* if you set the `shouldSendCallback` hook in your `Raven` configuration, make sure to call the `testKitInitializer(Raven)` function **after** your code has finished configuring Raven. You need to do this because we call `Raven.setShouldSendCallback` to ensure the proper functionality of the `Raven` lifecycle so you need to call the `testKitInitializer(Raven)` only after `Raven` is configured.<br>
See the documentation above if you want to pass your own `shouldSendCallback` logic to `raven-testkit`.