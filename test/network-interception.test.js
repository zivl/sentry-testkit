const Sentry = require('@sentry/node')
const nock = require('nock')
const sentryTestkit = require('../src/index')
const { createCommonTests } = require('./commonTests')

require('@sentry/tracing')

const { testkit, initNetworkInterceptor } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'
describe('sentry test-kit test suite - network interception', function() {
  let envelopeRequestHandler

  beforeAll(() => {
    nock.cleanAll()
    nock.disableNetConnect()

    initNetworkInterceptor(
      DUMMY_DSN,
      (baseUrl, handleRequestBody, handleEnvelopeRequestBody) => {
        envelopeRequestHandler = handleEnvelopeRequestBody
        nock(baseUrl)
          .persist()
          .post(/\/api\/000001\/store/)
          .reply(200, (_, requestBody) => {
            handleRequestBody(requestBody)
          })
          .post(/\/api\/000001\/envelope/)
          .reply(200)
          // use the request event since in a reply function (like above)
          // nock automatically tries to parse the body as json, and fails
          // since Sentry are using a non-standard json with a json request header
          // See https://develop.sentry.dev/sdk/envelopes/
          .on('request', (_, interceptor, body) => {
            if (interceptor.uri.test('/api/000001/envelope')) {
              handleEnvelopeRequestBody(body)
            }
          })
      }
    )

    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      tracesSampleRate: 1,
      beforeSend(event) {
        event.extra = { os: 'mac-os' }
        return event
      },
    })
  })

  beforeEach(() => testkit.reset())

  createCommonTests({ Sentry, testkit })

  test('should handle session item in envelope request', () => {
    const sessionEnvelopeBody =
      `{"sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.react","version":"6.11.0"}}\n` +
      `{"type":"session"}\n` +
      `{"sid":"<removed>","init":false,"started":"2021-08-17T14:27:11.361Z","timestamp":"2021-08-17T14:27:12.489Z","status":"ok","errors":1,"attrs":{"release":"<removed>","environment":"<removed>","user_agent":"<removed>"}}`

    expect(() => envelopeRequestHandler(sessionEnvelopeBody)).not.toThrow()
  })
})
