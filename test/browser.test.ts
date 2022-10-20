import { Event } from '@sentry/types'
import * as BrowserSentry from '@sentry/browser'
import sentryTestkit from '../src'
import { createCommonTests } from './commonTests'

import '@sentry/tracing'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'
const Sentry = BrowserSentry

describe('sentry test-kit test suite - @sentry/browser', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      tracesSampleRate: 1,
      transport: sentryTransport,
      beforeSend(event: Event) {
        event.extra = { os: 'mac-os' }
        return event
      },
    })
  )

  beforeEach(() => testkit.reset())

  createCommonTests({ Sentry, testkit })
})
