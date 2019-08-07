## Intro
Sentry testkit supports using network interception libraries, without the need to change your application's `Sentry.init` function. \
The testkit is agnostic to the interception library you use. 

### Example using nock
```javascript

const nock = require('nock')
const sentryTestkit = require('sentry-testkit')
const { testkit, initNetworkInterceptor } = sentryTestkit()

beforeAll(() => {
    const myAppDSN = '<your DSN goes here>'
    initNetworkInterceptor(myAppDSN, (baseUrl, handleRequestBody) => {
      // This callback is where we init our interceptor.
      // The interceptor should intercept requests from `baseUrl` and pass the
      // request body (as json) to the `handleRequestBody` function.
      nock(baseUrl)
        .persist()
        .post(/.*/)
        .reply(200, (_, requestBody) => {
          handleRequestBody(requestBody)
        })
    })
})

test('findReport example', async function() {
    const err = new Error('error to look for')

    // Some faulty scenario that will report err

    const report = testkit.findReport(err)
    expect(report).toBeDefined()
})
```
