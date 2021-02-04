const { testkit } = require('../src/jestMock')
const Sentry = require('@sentry/browser')
const { createCommonTests } = require('./commonTests')

const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('jest mock integration tests', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      beforeSend(event) {
        event.extra = { os: 'mac-os' }
        return event
      },
    })
  )

  beforeEach(() => testkit.reset())

  createCommonTests({ Sentry, testkit })
})
