import { Event, ErrorEvent } from '@sentry/core'
import * as ReactNativeSentry from '@sentry/react-native'
import sentryTestkit from '../../src'
import { createCommonTests } from '../../__tests__/commonTests'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'
const Sentry = ReactNativeSentry

describe('sentry test-kit test suite - @sentry/react-native', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      tracesSampleRate: 1,
      transport: sentryTransport,
      beforeSend(event: Event) {
        event.extra = { os: 'mac-os' }
        return event as ErrorEvent
      },
    })
  )

  beforeEach(() => testkit.reset())

  // @ts-expect-error
  createCommonTests({ Sentry, testkit })
})
