/**
 * @jest-environment jsdom
 */
import * as Sentry from '@sentry/browser'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

// Unlike the Node SDK, the browser SDK sends its accumulated outcomes when the
// page becomes hidden rather than on `Sentry.flush()`
const hidePage = () => {
  Object.defineProperty(document, 'visibilityState', {
    value: 'hidden',
    configurable: true,
  })
  document.dispatchEvent(new Event('visibilitychange'))
}

describe('sentry test-kit test suite - client reports in the browser', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      sendClientReports: true,
      beforeSend: () => null,
      transport: sentryTransport,
    })
  )

  beforeEach(() => testkit.reset())

  test('captures an event dropped by beforeSend when the page is hidden', async () => {
    Sentry.captureException(new Error('filtered out by beforeSend'))
    await Sentry.flush()

    hidePage()

    const [clientReport] = await testkit.waitForClientReports(1)
    expect(clientReport!.discardedEvents).toEqual([
      { reason: 'before_send', category: 'error', quantity: 1 },
    ])
    expect(testkit.reports()).toHaveLength(0)
  })
})
