import * as Sentry from '@sentry/node'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('sentry test-kit test suite - cron check-ins', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      environment: 'ci',
      transport: sentryTransport,
    })
  )

  beforeEach(() => testkit.reset())

  test('checkIns() is empty when nothing was reported', () => {
    expect(testkit.checkIns()).toEqual([])
  })

  test('captures an in-progress check-in with its monitor slug', async () => {
    Sentry.captureCheckIn({
      monitorSlug: 'nightly-report',
      status: 'in_progress',
    })
    const [checkIn] = await testkit.waitForCheckIns(1)

    expect(checkIn!.monitorSlug).toBe('nightly-report')
    expect(checkIn!.status).toBe('in_progress')
    expect(checkIn!.checkInId).toEqual(expect.any(String))
    expect(checkIn!.release).toBe('test')
    expect(checkIn!.environment).toBe('ci')
  })

  test('captures a finished check-in with its status and duration', async () => {
    const checkInId = Sentry.captureCheckIn({
      monitorSlug: 'nightly-report',
      status: 'in_progress',
    })
    Sentry.captureCheckIn({
      checkInId,
      monitorSlug: 'nightly-report',
      status: 'ok',
      duration: 12.5,
    })
    const checkIns = await testkit.waitForCheckIns(2)

    expect(checkIns.map(c => c.status)).toEqual(['in_progress', 'ok'])
    const finished = checkIns[1]!
    expect(finished.checkInId).toBe(checkInId)
    expect(finished.duration).toBe(12.5)
  })

  test('captures a failed check-in', async () => {
    Sentry.captureCheckIn({ monitorSlug: 'nightly-report', status: 'error' })
    const [checkIn] = await testkit.waitForCheckIns(1)

    expect(checkIn!.status).toBe('error')
  })

  test('exposes the raw check-in payload as originalCheckIn', async () => {
    Sentry.captureCheckIn({ monitorSlug: 'raw-monitor', status: 'ok' })
    const [checkIn] = await testkit.waitForCheckIns(1)

    expect(checkIn!.originalCheckIn.monitor_slug).toBe('raw-monitor')
    expect(checkIn!.originalCheckIn.status).toBe('ok')
  })

  test('reset() clears captured check-ins', async () => {
    Sentry.captureCheckIn({ monitorSlug: 'nightly-report', status: 'ok' })
    await testkit.waitForCheckIns(1)

    testkit.reset()

    expect(testkit.checkIns()).toHaveLength(0)
  })
})
