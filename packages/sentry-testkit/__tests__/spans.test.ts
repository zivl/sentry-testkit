import * as Sentry from '@sentry/browser'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

// Only the browser SDK sends standalone spans - the node SDK builds its spans on
// OpenTelemetry, which always wraps them into a transaction
function startStandaloneSpan(options: Sentry.StartSpanOptions) {
  Sentry.startInactiveSpan({
    ...options,
    experimental: { standalone: true },
  }).end()
  return Sentry.flush()
}

describe('sentry test-kit test suite - standalone spans', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      tracesSampleRate: 1,
      transport: sentryTransport,
    })
  )

  beforeEach(() => testkit.reset())

  test('spans() is empty when nothing was traced', () => {
    expect(testkit.spans()).toEqual([])
  })

  test('captures a standalone span with its metadata', async () => {
    await startStandaloneSpan({ name: 'inp span', op: 'ui.interaction.click' })

    const spans = await testkit.waitForSpans(1)
    expect(spans).toHaveLength(1)
    const span = spans[0]!
    expect(span.description).toEqual('inp span')
    expect(span.op).toEqual('ui.interaction.click')
    expect(span.spanId).toEqual(expect.any(String))
    expect(span.traceId).toEqual(expect.any(String))
    expect(span.startTimestamp).toEqual(expect.any(Number))
    expect(span.endTimestamp).toEqual(expect.any(Number))
    expect(span.isStandalone).toBe(true)
  })

  test('captures the attributes of an AI agent span', async () => {
    await startStandaloneSpan({
      name: 'chat gpt-4',
      op: 'gen_ai.chat',
      attributes: {
        'gen_ai.request.model': 'gpt-4',
        'gen_ai.usage.input_tokens': 12,
      },
    })

    const [span] = await testkit.waitForSpans(1)
    expect(span!.data['gen_ai.request.model']).toEqual('gpt-4')
    expect(span!.data['gen_ai.usage.input_tokens']).toEqual(12)
    expect(span!.attributes['gen_ai.request.model']).toEqual('gpt-4')
  })

  test('finds standalone and transaction spans by the same op', async () => {
    await startStandaloneSpan({ name: 'standalone chat', op: 'gen_ai.chat' })
    Sentry.startSpan({ name: 'ai-flow' }, () => {
      Sentry.startInactiveSpan({
        name: 'nested chat',
        op: 'gen_ai.chat',
      }).end()
    })
    await Sentry.flush()

    const spans = await testkit.waitForSpans(2)
    expect(spans.map(span => span.isStandalone)).toEqual([true, false])
    expect(
      testkit.findSpansByOp('gen_ai.chat').map(span => span.description)
    ).toEqual(['standalone chat', 'nested chat'])
  })

  test('exposes the raw span payload as originalSpan', async () => {
    await startStandaloneSpan({ name: 'raw span', op: 'ui.interaction.click' })

    const [span] = await testkit.waitForSpans(1)
    expect(span!.originalSpan.description).toEqual('raw span')
    expect(span!.originalSpan.span_id).toEqual(span!.spanId)
  })

  test('keeps the wire-format fields of a span', async () => {
    await startStandaloneSpan({ name: 'aliased span', op: 'ui.action' })

    const [span] = await testkit.waitForSpans(1)
    expect(span!.span_id).toEqual(span!.spanId)
    expect(span!.id).toEqual(span!.spanId)
    expect(span!.trace_id).toEqual(span!.traceId)
  })

  test('waitForSpans rejects with a descriptive error on timeout', async () => {
    await expect(testkit.waitForSpans(1, { timeout: 50 })).rejects.toThrow(
      'Expected at least 1 spans within 50ms, but only 0 were captured'
    )
  })

  test('reset() clears captured spans', async () => {
    await startStandaloneSpan({ name: 'to be cleared', op: 'ui.action' })
    await testkit.waitForSpans(1)

    testkit.reset()

    expect(testkit.spans()).toHaveLength(0)
  })
})
