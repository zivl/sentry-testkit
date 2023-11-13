import '../src/jestMock'
import * as Sentry from '@sentry/browser'
import '@sentry/tracing'
import { createCommonTests } from './commonTests'

const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('jest mock integration tests', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      tracesSampleRate: 1,
      beforeSend(event) {
        event.extra = { os: 'mac-os' }
        return event
      },
    })
  )

  beforeEach(() => global.testkit.reset())

  createCommonTests({ Sentry, testkit: global.testkit })
})
