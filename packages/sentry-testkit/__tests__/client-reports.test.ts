import * as Sentry from '@sentry/node'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

// The SDK sends the outcomes it has accumulated at the start of a flush, and
// only records the outcome of a dropped event while that same flush drains the
// event pipeline - so a client report goes out on the flush after the one that
// dropped the event
const flushClientReports = async () => {
  await Sentry.flush()
  await Sentry.flush()
}

describe('sentry test-kit test suite - client reports', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      sendClientReports: true,
      tracesSampleRate: 0,
      beforeSend: () => null,
      transport: sentryTransport,
    })
  )

  beforeEach(() => testkit.reset())

  test('clientReports() is empty when nothing was dropped', () => {
    expect(testkit.clientReports()).toEqual([])
  })

  test('captures an event dropped by beforeSend', async () => {
    Sentry.captureException(new Error('filtered out by beforeSend'))
    await flushClientReports()

    const [clientReport] = await testkit.waitForClientReports(1)
    expect(clientReport!.discardedEvents).toEqual([
      { reason: 'before_send', category: 'error', quantity: 1 },
    ])
    expect(clientReport!.timestamp).toEqual(expect.any(Number))
    expect(testkit.reports()).toHaveLength(0)
  })

  test('sums the quantity of events dropped for the same reason', async () => {
    Sentry.captureException(new Error('first'))
    Sentry.captureException(new Error('second'))
    await flushClientReports()

    const [clientReport] = await testkit.waitForClientReports(1)
    expect(clientReport!.discardedEvents).toEqual([
      { reason: 'before_send', category: 'error', quantity: 2 },
    ])
  })

  test('captures a transaction dropped by the sample rate', async () => {
    Sentry.startSpan({ name: 'checkout-flow' }, () => undefined)
    await flushClientReports()

    const [clientReport] = await testkit.waitForClientReports(1)
    expect(clientReport!.discardedEvents).toContainEqual({
      reason: 'sample_rate',
      category: 'transaction',
      quantity: 1,
    })
    expect(testkit.transactions()).toHaveLength(0)
  })

  test('exposes the raw client report payload as originalClientReport', async () => {
    Sentry.captureException(new Error('filtered out by beforeSend'))
    await flushClientReports()

    const [clientReport] = await testkit.waitForClientReports(1)
    expect(clientReport!.originalClientReport.discarded_events).toEqual([
      { reason: 'before_send', category: 'error', quantity: 1 },
    ])
  })

  test('reset() clears captured client reports', async () => {
    Sentry.captureException(new Error('filtered out by beforeSend'))
    await flushClientReports()
    await testkit.waitForClientReports(1)

    testkit.reset()

    expect(testkit.clientReports()).toHaveLength(0)
  })
})
