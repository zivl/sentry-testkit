# raven-testkit
[![GitHub version](https://badge.fury.io/gh/wix%2Fraven-testkit.svg)](https://badge.fury.io/gh/wix%2Fraven-testkit)
[![npm version](https://badge.fury.io/js/raven-testkit.svg)](https://badge.fury.io/js/raven-testkit)

Raven is a JavaScript SDK published by [Sentry.io](https://docs.sentry.io/clients/) to enable software flow tracking and issues reporting to *Sentry* system.<br>
However, when building tests for your application, you want to assert that the right flow-tracking or error is being sent to *Sentry*, **but** without really send it to the *Sentry* system so it won't swamp it with false reports during test running and other CI operations.

## Raven Test Kit - to the rescue
Raven test kit enables Raven to work natively in your application, but it overrides default Raven's transport mechanism so the report is not really sent but rather logged. In this way, the logged reports can be fetched later on for verification usage or whatever you see fit in your testing environment.

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

You may see more example usage in the testing section of this repository as well

### Test Kit API
**reports**<br>
returns `Array`, where each member of the array consists of `Raven`'s *data* object<br>
You may refer to [Sentry Docs](https://docs.sentry.io/clients/) for further explanation and details

**reset**<br>
Resets and clears the current test-kit instance logs

## Gotcha(s)
* In case you have set the `shouldSendCallback` hook in your `Raven` configuration, pay attention to call `testKitInitializer(Raven)` function **after** your code has finished configuring Raven. It is because we call `Raven.setShouldSendCallback` to ensure proper functionality of `Raven` lifecycle.<br>
See documentation above to pass your own `shouldSendCallback` to `raven-testkit`