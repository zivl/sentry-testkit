import * as Sentry from '@sentry/node'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('sentry test-kit test suite - structured logs', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      enableLogs: true,
      transport: sentryTransport,
    })
  )

  beforeEach(() => testkit.reset())

  test('logs() is empty when nothing was logged', () => {
    expect(testkit.logs()).toEqual([])
  })

  test('captures a log with level, message and timestamp', async () => {
    Sentry.logger.info('user logged in')
    await Sentry.flush()

    expect(testkit.logs()).toHaveLength(1)
    const log = testkit.logs()[0]!
    expect(log.level).toBe('info')
    expect(log.message).toBe('user logged in')
    expect(log.timestamp).toEqual(expect.any(Number))
  })

  test('unwraps typed attributes to plain values', async () => {
    Sentry.logger.warn('quota almost exceeded', {
      userId: 42,
      plan: 'free',
      active: true,
    })
    await Sentry.flush()

    expect(testkit.logs()).toHaveLength(1)
    const log = testkit.logs()[0]!
    expect(log.level).toBe('warn')
    expect(log.attributes['userId']).toBe(42)
    expect(log.attributes['plan']).toBe('free')
    expect(log.attributes['active']).toBe(true)
  })

  test('captures multiple logs in order with their levels', async () => {
    Sentry.logger.debug('first')
    Sentry.logger.error('second')
    await Sentry.flush()

    expect(testkit.logs().map(log => log.level)).toEqual(['debug', 'error'])
    expect(testkit.logs().map(log => log.message)).toEqual(['first', 'second'])
  })

  test('exposes the raw serialized log as originalLog', async () => {
    Sentry.logger.info('raw access')
    await Sentry.flush()

    const log = testkit.logs()[0]!
    expect(log.originalLog.body).toBe('raw access')
    expect(log.originalLog.level).toBe('info')
  })

  test('reset() clears captured logs', async () => {
    Sentry.logger.info('to be cleared')
    await Sentry.flush()
    expect(testkit.logs()).toHaveLength(1)

    testkit.reset()

    expect(testkit.logs()).toHaveLength(0)
  })
})
