const Sentry = require('@sentry/node')
const nock = require('nock')
const sentryTestkit = require('../src/index')
const { createCommonTests } = require('./commonTests')

const { testkit, initNetworkInterceptor } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'
describe('sentry test-kit test suite - network interception', function() {
  beforeAll(() => {
    nock.cleanAll()
    nock.disableNetConnect()

    initNetworkInterceptor(DUMMY_DSN, (baseUrl, handleRequestBody) => {
      nock(baseUrl)
        .persist()
        .post(/.*/)
        .reply(200, (_, requestBody) => {
          handleRequestBody(requestBody)
        })
    })

    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      beforeSend(event) {
        event.extra = { os: 'mac-os' }
        return event
      },
    })
  })

  beforeEach(() => testkit.reset())

  createCommonTests({ Sentry, testkit })
})
