const BrowserSentry = require('@sentry/browser')
const sentryTestkit = require('../src/index')
const { createCommonTests } = require('./commonTests')

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'
const Sentry = BrowserSentry
describe('sentry test-kit test suite - @sentry/browser', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      transport: sentryTransport,
      beforeSend(event) {
        event.extra = { os: 'mac-os' }
        return event
      },
    })
  )

  beforeEach(() => testkit.reset())

  createCommonTests({ Sentry, testkit })
})
