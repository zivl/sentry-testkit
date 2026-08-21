import { createEnvelope } from '@sentry/core'
import * as Sentry from '@sentry/node'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

const REPLAY_ID = '1c9a0c6f70d543c9b4d1b0e0f0a1b2c3'

const rrwebEvents = JSON.stringify([
  { type: 4, timestamp: 1717081538235, data: { href: 'https://example.com' } },
])
// A recording payload is its own `{"segment_id":n}` header line followed by the
// rrweb events, which the browser SDK gzips when a compression worker is available
const recordingPayload = (segmentId: number) =>
  `{"segment_id":${segmentId}}\n${rrwebEvents}`

// The replay integration only records in a real browser, so the segment is handed
// to the real client's envelope pipeline the same way the integration does it
function sendReplaySegment(replayEvent: Record<string, any> = {}) {
  const segmentId = replayEvent['segment_id'] ?? 0
  const payload = recordingPayload(segmentId)
  const envelope = createEnvelope<any>(
    { event_id: REPLAY_ID, sent_at: new Date().toISOString() },
    [
      [
        { type: 'replay_event' },
        {
          type: 'replay_event',
          replay_id: REPLAY_ID,
          segment_id: segmentId,
          replay_type: 'session',
          timestamp: 1717081538.235,
          urls: ['https://example.com/checkout'],
          error_ids: [],
          trace_ids: [],
          release: 'test',
          environment: 'ci',
          ...replayEvent,
        },
      ],
      [{ type: 'replay_recording', length: payload.length }, payload as any],
    ]
  )

  return Sentry.getClient()!.sendEnvelope(envelope)
}

describe('sentry test-kit test suite - session replay', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      environment: 'ci',
      transport: sentryTransport,
    })
  )

  beforeEach(() => testkit.reset())

  test('replays() is empty when nothing was recorded', () => {
    expect(testkit.replays()).toEqual([])
  })

  test('captures a replay segment with its metadata', async () => {
    sendReplaySegment()
    const [replay] = await testkit.waitForReplays(1)

    expect(replay!.replayId).toBe(REPLAY_ID)
    expect(replay!.segmentId).toBe(0)
    expect(replay!.replayType).toBe('session')
    expect(replay!.timestamp).toBe(1717081538.235)
    expect(replay!.urls).toEqual(['https://example.com/checkout'])
    expect(replay!.release).toBe('test')
    expect(replay!.environment).toBe('ci')
  })

  test('captures the error and trace ids a replay is linked to', async () => {
    sendReplaySegment({
      replay_type: 'buffer',
      error_ids: ['e1a2b3c4d5e6f7081920a1b2c3d4e5f6'],
      trace_ids: ['aabbccddeeff00112233445566778899'],
    })
    const [replay] = await testkit.waitForReplays(1)

    expect(replay!.replayType).toBe('buffer')
    expect(replay!.errorIds).toEqual(['e1a2b3c4d5e6f7081920a1b2c3d4e5f6'])
    expect(replay!.traceIds).toEqual(['aabbccddeeff00112233445566778899'])
  })

  test('keeps the raw recording payload of the same envelope', async () => {
    sendReplaySegment()
    const [replay] = await testkit.waitForReplays(1)

    expect(Buffer.from(replay!.recording!).toString()).toBe(recordingPayload(0))
  })

  test('captures every segment of a replay separately', async () => {
    sendReplaySegment({ segment_id: 0 })
    sendReplaySegment({ segment_id: 1 })
    const replays = await testkit.waitForReplays(2)

    expect(replays.map(replay => replay.segmentId)).toEqual([0, 1])
    expect(replays.every(replay => replay.replayId === REPLAY_ID)).toBe(true)
  })

  test('exposes the raw replay payload as originalReplay', async () => {
    sendReplaySegment()
    const [replay] = await testkit.waitForReplays(1)

    expect(replay!.originalReplay.replay_id).toBe(REPLAY_ID)
    expect(replay!.originalReplay.type).toBe('replay_event')
  })

  test('links an error to the replay it was recorded in', async () => {
    Sentry.withScope(scope => {
      scope.setContext('replay', { replay_id: REPLAY_ID })
      Sentry.captureException(new Error('checkout failed'))
    })
    const [report] = await testkit.waitForReports(1)

    expect(report!.replayId).toBe(REPLAY_ID)
  })

  test('errors recorded without a replay have no replayId', async () => {
    Sentry.captureException(new Error('no replay running'))
    const [report] = await testkit.waitForReports(1)

    expect(report!.replayId).toBeUndefined()
  })

  test('waitForReplays rejects with a descriptive error on timeout', async () => {
    await expect(testkit.waitForReplays(1, { timeout: 50 })).rejects.toThrow(
      'Expected at least 1 replays within 50ms, but only 0 were captured'
    )
  })

  test('reset() clears captured replays', async () => {
    sendReplaySegment()
    await testkit.waitForReplays(1)

    testkit.reset()

    expect(testkit.replays()).toHaveLength(0)
  })
})
