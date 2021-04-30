import * as SentryNode from '@sentry/node'
import type { Event } from '@sentry/node'
import sentryTestkit from '../src'
import { createCommonTests } from './commonTests'

const { testkit, sentryTransport } = sentryTestkit()

const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'
const Sentry = SentryNode
describe('sentry test-kit test suite - @sentry/node', function () {
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
