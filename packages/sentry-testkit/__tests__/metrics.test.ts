import * as Sentry from '@sentry/node'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

// Application metrics are a Sentry SDK v10 feature; v9, which CI also runs
// against, has no metrics API at all, so the suite has nothing to drive there
const metrics = (Sentry as any).metrics
const describeMetrics =
  typeof metrics?.count === 'function' ? describe : describe.skip

describeMetrics('sentry test-kit test suite - application metrics', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      environment: 'ci',
      enableMetrics: true,
      transport: sentryTransport,
    })
  )

  beforeEach(() => testkit.reset())

  test('metrics() is empty when nothing was emitted', () => {
    expect(testkit.metrics()).toEqual([])
  })

  test('captures a counter with its name, type and value', async () => {
    metrics.count('api.requests', 3)
    await Sentry.flush()

    expect(testkit.metrics()).toHaveLength(1)
    const metric = testkit.metrics()[0]!
    expect(metric.name).toBe('api.requests')
    expect(metric.type).toBe('counter')
    expect(metric.value).toBe(3)
    expect(metric.timestamp).toEqual(expect.any(Number))
    expect(metric.traceId).toEqual(expect.any(String))
  })

  test('captures a gauge with its unit', async () => {
    metrics.gauge('memory.usage', 1024, { unit: 'megabyte' })
    await Sentry.flush()

    expect(testkit.metrics()).toHaveLength(1)
    const metric = testkit.metrics()[0]!
    expect(metric.name).toBe('memory.usage')
    expect(metric.type).toBe('gauge')
    expect(metric.value).toBe(1024)
    expect(metric.unit).toBe('megabyte')
  })

  test('captures a distribution', async () => {
    metrics.distribution('request.duration', 235, { unit: 'millisecond' })
    await Sentry.flush()

    expect(testkit.metrics()).toHaveLength(1)
    const metric = testkit.metrics()[0]!
    expect(metric.name).toBe('request.duration')
    expect(metric.type).toBe('distribution')
    expect(metric.value).toBe(235)
  })

  test('unwraps typed attributes to plain values', async () => {
    metrics.count('api.requests', 1, {
      attributes: { endpoint: '/api/users', status: 200, cached: false },
    })
    await Sentry.flush()

    expect(testkit.metrics()).toHaveLength(1)
    const metric = testkit.metrics()[0]!
    expect(metric.attributes['endpoint']).toBe('/api/users')
    expect(metric.attributes['status']).toBe(200)
    expect(metric.attributes['cached']).toBe(false)
    expect(metric.attributes['sentry.release']).toBe('test')
    expect(metric.attributes['sentry.environment']).toBe('ci')
  })

  test('captures multiple metrics batched in a single envelope item', async () => {
    metrics.count('items.processed', 5)
    metrics.gauge('queue.depth', 12)
    await Sentry.flush()

    expect(testkit.metrics().map(metric => metric.name)).toEqual([
      'items.processed',
      'queue.depth',
    ])
    expect(testkit.metrics().map(metric => metric.value)).toEqual([5, 12])
  })

  test('exposes the raw serialized metric as originalMetric', async () => {
    metrics.count('raw.metric', 1)
    await Sentry.flush()

    const metric = testkit.metrics()[0]!
    expect(metric.originalMetric.name).toBe('raw.metric')
    expect(metric.originalMetric.type).toBe('counter')
  })

  test('waitForMetrics resolves once the expected count is reached', async () => {
    metrics.count('awaited.metric', 1)
    Sentry.flush()

    const captured = await testkit.waitForMetrics(1)
    expect(captured[0]!.name).toBe('awaited.metric')
  })

  test('waitForMetrics rejects with a descriptive error on timeout', async () => {
    await expect(testkit.waitForMetrics(1, { timeout: 50 })).rejects.toThrow(
      'Expected at least 1 metrics within 50ms, but only 0 were captured'
    )
  })

  test('reset() clears captured metrics', async () => {
    metrics.count('to.be.cleared', 1)
    await Sentry.flush()
    expect(testkit.metrics()).toHaveLength(1)

    testkit.reset()

    expect(testkit.metrics()).toHaveLength(0)
  })
})
