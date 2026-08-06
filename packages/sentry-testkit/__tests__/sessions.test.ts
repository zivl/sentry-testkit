import * as Sentry from '@sentry/node'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('sentry test-kit test suite - sessions / release health', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      environment: 'ci',
      transport: sentryTransport,
    })
  )

  // The Node SDK starts a session at init, and startSession() ends it. Closing
  // it up front keeps each test's assertions about its own session.
  beforeEach(() => {
    Sentry.endSession()
    testkit.reset()
  })

  const startSession = () => {
    Sentry.startSession()
    return Sentry.getIsolationScope().getSession()!.sid
  }

  test('sessions() is empty when nothing was reported', () => {
    expect(testkit.sessions()).toEqual([])
  })

  test('captures a started session with its release and environment', async () => {
    const sid = startSession()
    Sentry.captureSession()
    const [session] = await testkit.waitForSessions(1)

    expect(session!.sid).toBe(sid)
    expect(session!.status).toBe('ok')
    expect(session!.errors).toBe(0)
    expect(session!.release).toBe('test')
    expect(session!.environment).toBe('ci')
  })

  test('captures an exited session with its duration', async () => {
    const sid = startSession()
    Sentry.endSession()
    const [session] = await testkit.waitForSessions(1)

    expect(session!.sid).toBe(sid)
    expect(session!.status).toBe('exited')
    expect(session!.duration).toEqual(expect.any(Number))
  })

  test('counts errors reported during a session', async () => {
    startSession()
    Sentry.captureException(new Error('session error'))
    await Sentry.flush()
    Sentry.endSession()
    const sessions = await testkit.waitForSessions(1)

    expect(sessions[sessions.length - 1]!.errors).toBe(1)
  })

  test('exposes the raw session payload as originalSession', async () => {
    startSession()
    Sentry.captureSession()
    const [session] = await testkit.waitForSessions(1)

    expect(session!.originalSession.sid).toBe(session!.sid)
    expect(session!.originalSession.attrs.release).toBe('test')
  })

  test('captures aggregated sessions sent by server-side release health', async () => {
    Sentry.getClient()!.sendSession({
      attrs: { release: 'test', environment: 'ci' },
      aggregates: [
        { started: '2024-01-01T00:00:00.000Z', exited: 2, crashed: 1 },
        { started: '2024-01-01T00:01:00.000Z', errored: 3 },
      ],
    })
    const aggregates = await testkit.waitForSessionAggregates(2)

    expect(aggregates[0]!.started).toBe('2024-01-01T00:00:00.000Z')
    expect(aggregates[0]!.exited).toBe(2)
    expect(aggregates[0]!.crashed).toBe(1)
    expect(aggregates[0]!.errored).toBe(0)
    expect(aggregates[0]!.abnormal).toBe(0)
    expect(aggregates[0]!.release).toBe('test')
    expect(aggregates[0]!.environment).toBe('ci')
    expect(aggregates[1]!.errored).toBe(3)
    expect(testkit.sessions()).toHaveLength(0)
  })

  test('reset() clears captured sessions', async () => {
    startSession()
    Sentry.captureSession()
    await testkit.waitForSessions(1)

    testkit.reset()

    expect(testkit.sessions()).toHaveLength(0)
    expect(testkit.sessionAggregates()).toHaveLength(0)
  })
})
