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
    initNetworkInterceptor(myAppDSN, (baseUrl, handleRequestBody, handleEnvelopeRequestBody) => {
      // This callback is where we init our interceptor.
      // The interceptor should intercept requests from `baseUrl` and pass the
      // request body (as json) to the `handleRequestBody` function.
      // For envelope requests (such as performance events), we use the emitted request event,
      // since in a reply function nock automatically tries to parse the body as json,
      // and fails since Sentry are using a non-standard json with a json request header.
      // See https://develop.sentry.dev/sdk/envelopes/ for more information on envelope requests.
      nock(baseUrl)
        .persist()
        .post(/\/api\/.*\/store/)
          .reply(200, (_, requestBody) => {
            handleRequestBody(requestBody)
          })
          .post(/\/api\/.*\/envelope/)
          .reply(200)
          .on('request', (_, interceptor, body) => {
            if (interceptor.uri.test('/api/000000/envelope')) {
              handleEnvelopeRequestBody(body)
            }
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
