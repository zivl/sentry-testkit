import EventEmitter from 'events'
import sentryTestkit from '../src/index'

const { testkit } = sentryTestkit()

describe('Puppeteer testkit', () => {
  let page: EventEmitter
  const errorMessage = 'sentry puppeteer testkit is awesome!'
  const createSentryCaptureRequest = (baseUrl = 'https://sentry.io') => ({
    url: () => `${baseUrl}/api/1234567/store`,
    postData: () =>
      JSON.stringify({
        exception: {
          values: [{ value: errorMessage }],
        },
      }),
  })
  const createSentryPerfRequest = (baseUrl = 'https://sentry.io') => ({
    url: () => `${baseUrl}/api/1234567/envelope`,
    postData: () =>
      `{"event_id":"601fdd0eb40343f08274857951e483de","sent_at":"2021-06-11T16:57:39.943Z","sdk":{"name":"sentry.javascript.node","version":"6.6.0"}}
      {"type":"transaction","sample_rates":[{"id":"client_rate","rate":1}]}
      {"contexts":{"trace":{"op":"transaction","span_id":"9ce5f4be9f39417f","trace_id":"57909d703068487a9e3cff52a6279484"}},"spans":[{"description":"child-description","op":"child-span","parent_span_id":"9ce5f4be9f39417f","span_id":"b12b5d02ec5f7b1c","start_timestamp":1623430659.9326224,"timestamp":1623430659.9327486,"trace_id":"57909d703068487a9e3cff52a6279484"}],"start_timestamp":1623430659.93125,"tags":{},"timestamp":1623430659.9330351,"transaction":"transaction-name","type":"transaction","platform":"node","event_id":"601fdd0eb40343f08274857951e483de","environment":"production","sdk":{"integrations":["InboundFilters","FunctionToString","Console","Http","OnUncaughtException","OnUnhandledRejection","LinkedErrors"],"name":"sentry.javascript.node","version":"6.6.0","packages":[{"name":"npm:@sentry/node","version":"6.6.0"}]}}`,
  })
  const sentryMetricRequest = {
    url: () => 'https://sentry.io/api/1234567/envelope',
    postData: () => `{"sdk":{"name":"sentry.javascript.browser","version":"10.46.0"}}
{"type":"trace_metric","item_count":1,"content_type":"application/vnd.sentry.items.trace-metric+json"}
{"items":[{"timestamp":1717081538.235,"trace_id":"abcd1234","name":"api.requests","type":"counter","value":3,"unit":"none","attributes":{"endpoint":{"value":"/api/users","type":"string"}}}]}`,
  }
  const sentryAttachmentRequest = {
    url: () => 'https://sentry.io/api/1234567/envelope',
    postData: () => `{"event_id":"9f2f0e1a","sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.browser","version":"10.46.0"}}
{"type":"attachment","length":26,"filename":"state.json","content_type":"application/json"}
{"cart":["sku-1","sku-2"]}
{"type":"event"}
{"exception":{"values":[{"type":"Error","value":"checkout failed"}]},"level":"error","tags":{}}`,
  }
  const sentrySessionRequest = {
    url: () => 'https://sentry.io/api/1234567/envelope',
    postData: () => `{"sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.react","version":"6.11.0"}}
{"type":"session"}
{"sid":"<removed>","init":false,"started":"2021-08-17T14:27:11.361Z","timestamp":"2021-08-17T14:27:12.489Z","status":"ok","errors":1,"attrs":{"release":"<removed>","environment":"<removed>","user_agent":"<removed>"}}`,
  }

  const replayRecordingPayload = `{"segment_id":0}\n[{"type":4,"timestamp":1717081538235}]`
  const sentryReplayRequest = {
    url: () => 'https://sentry.io/api/1234567/envelope',
    postData: () => `{"event_id":"rp123","sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.browser","version":"10.46.0"}}
{"type":"replay_event"}
{"type":"replay_event","replay_id":"rp123","segment_id":0,"replay_type":"session","urls":["https://example.com/checkout"],"error_ids":["err456"],"trace_ids":[]}
{"type":"replay_recording","length":${replayRecordingPayload.length}}
${replayRecordingPayload}`,
  }

  const sentrySpanRequest = {
    url: () => 'https://sentry.io/api/1234567/envelope',
    postData: () => `{"sent_at":"2026-08-22T10:24:38.562Z","trace":{"trace_id":"ea0a0403d31e4359a544682fa294112f","public_key":"acacaeaccacacacabcaacdacdacadaca"}}
{"type":"span"}
{"data":{"sentry.op":"gen_ai.chat","gen_ai.request.model":"gpt-4"},"description":"chat gpt-4","op":"gen_ai.chat","span_id":"a047b3f1e1b402ad","start_timestamp":1787394278.5618343,"timestamp":1787394278.5620565,"trace_id":"ea0a0403d31e4359a544682fa294112f","origin":"manual","is_segment":true,"segment_id":"a047b3f1e1b402ad"}`,
  }

  const sentryClientReportRequest = {
    url: () => 'https://sentry.io/api/1234567/envelope',
    postData: () => `{"sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.browser","version":"10.46.0"}}
{"type":"client_report"}
{"timestamp":1717081538.235,"discarded_events":[{"reason":"before_send","category":"error","quantity":2}]}`,
  }

  beforeEach(() => {
    testkit.reset()
    page = new EventEmitter()
  })

  test('should report to testkit', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', createSentryCaptureRequest())
    expect(testkit.reports()).toHaveLength(1)
    const { message } = testkit.getExceptionAt(0)!
    expect(message).toEqual(errorMessage)
  })

  test('should collect performance transactions', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', createSentryPerfRequest())
    expect(testkit.transactions()).toHaveLength(1)
    expect(testkit.transactions()[0]!.name).toEqual('transaction-name')
  })

  test('should collect metrics from a trace_metric envelope item', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', sentryMetricRequest)
    expect(testkit.metrics()).toHaveLength(1)
    const metric = testkit.metrics()[0]!
    expect(metric.name).toEqual('api.requests')
    expect(metric.type).toEqual('counter')
    expect(metric.value).toEqual(3)
    expect(metric.attributes['endpoint']).toEqual('/api/users')
  })

  test('should collect attachments and link them to the report', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', sentryAttachmentRequest)
    expect(testkit.attachments()).toHaveLength(1)
    const attachment = testkit.attachments()[0]!
    expect(attachment.filename).toEqual('state.json')
    expect(attachment.contentType).toEqual('application/json')
    expect(attachment.text).toEqual('{"cart":["sku-1","sku-2"]}')
    expect(testkit.reports()).toHaveLength(1)
    expect(testkit.reports()[0]!.attachments).toEqual([attachment])
  })

  test('should handle session items in an envelope request', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', sentrySessionRequest)
    expect(testkit.transactions()).toHaveLength(0)
  })

  test('should collect a replay segment with its recording', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', sentryReplayRequest)
    expect(testkit.replays()).toHaveLength(1)
    const replay = testkit.replays()[0]!
    expect(replay.replayId).toEqual('rp123')
    expect(replay.segmentId).toEqual(0)
    expect(replay.replayType).toEqual('session')
    expect(replay.urls).toEqual(['https://example.com/checkout'])
    expect(replay.errorIds).toEqual(['err456'])
    expect(Buffer.from(replay.recording!).toString()).toEqual(
      replayRecordingPayload
    )
    expect(testkit.reports()).toHaveLength(0)
  })

  test('should collect a standalone span', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', sentrySpanRequest)
    expect(testkit.spans()).toHaveLength(1)
    const span = testkit.spans()[0]!
    expect(span.spanId).toEqual('a047b3f1e1b402ad')
    expect(span.traceId).toEqual('ea0a0403d31e4359a544682fa294112f')
    expect(span.op).toEqual('gen_ai.chat')
    expect(span.description).toEqual('chat gpt-4')
    expect(span.data['gen_ai.request.model']).toEqual('gpt-4')
    expect(span.isStandalone).toBe(true)
    expect(testkit.transactions()).toHaveLength(0)
  })

  test('should collect the spans of a transaction', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', createSentryPerfRequest())
    expect(testkit.spans()).toHaveLength(1)
    const span = testkit.spans()[0]!
    expect(span.description).toEqual('child-description')
    expect(span.op).toEqual('child-span')
    expect(span.parentSpanId).toEqual('9ce5f4be9f39417f')
    expect(span.isStandalone).toBe(false)
    expect(testkit.findSpansByOp('child-span')).toHaveLength(1)
  })

  test('should collect a client report with its discarded events', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', sentryClientReportRequest)
    expect(testkit.clientReports()).toHaveLength(1)
    const clientReport = testkit.clientReports()[0]!
    expect(clientReport.timestamp).toEqual(1717081538.235)
    expect(clientReport.discardedEvents).toEqual([
      { reason: 'before_send', category: 'error', quantity: 2 },
    ])
    expect(testkit.reports()).toHaveLength(0)
  })

  test('should stop listening after calling stopListening', () => {
    testkit.puppeteer.startListening(page)
    testkit.puppeteer.stopListening(page)
    page.emit('request', createSentryCaptureRequest())
    expect(testkit.reports()).toHaveLength(0)
  })

  test('should support self-hosted sentry', () => {
    const baseUrl = 'https://my-self-hosted-sentry.com'
    testkit.puppeteer.startListening(page, baseUrl)
    page.emit('request', createSentryCaptureRequest(baseUrl))
    expect(testkit.reports()).toHaveLength(1)
  })
})
