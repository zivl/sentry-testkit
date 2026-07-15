import { parseEnvelope, handleEnvelopeRequestData } from '../src/parsers'
import { createTestkit } from '../src/testkit'

const envelopeHeader = `{"sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.node","version":"6.11.0"}}`
const eventPayload = `{"exception":{"values":[{"type":"Error","value":"testing error"}]},"level":"error","tags":{}}`
const transactionPayload = `{"type":"transaction","transaction":"test-transaction","contexts":{"trace":{"trace_id":"1234","span_id":"5678"}},"spans":[]}`
const sessionPayload = `{"sid":"abc","init":false,"started":"2021-08-17T14:27:11.361Z","status":"ok","errors":1}`

describe('parseEnvelope', () => {
  test('parses a single-item event envelope', () => {
    const body = `${envelopeHeader}\n{"type":"event"}\n${eventPayload}`

    const items = parseEnvelope(body)

    expect(items).toHaveLength(1)
    expect(items[0]!.header.type).toBe('event')
    expect(items[0]!.payload.level).toBe('error')
  })

  test('parses all items of a multi-item envelope', () => {
    const body =
      `${envelopeHeader}\n` +
      `{"type":"session"}\n${sessionPayload}\n` +
      `{"type":"event"}\n${eventPayload}\n` +
      `{"type":"client_report"}\n{"timestamp":123,"discarded_events":[]}`

    const items = parseEnvelope(body)

    expect(items.map(item => item.header.type)).toEqual([
      'session',
      'event',
      'client_report',
    ])
  })

  test('honors the length field for payloads containing newlines', () => {
    const payloadWithNewlines = 'first line\nsecond line'
    const body =
      `${envelopeHeader}\n` +
      `{"type":"attachment","filename":"log.txt","length":${payloadWithNewlines.length}}\n` +
      `${payloadWithNewlines}\n` +
      `{"type":"event"}\n${eventPayload}`

    const items = parseEnvelope(body)

    expect(items).toHaveLength(2)
    expect(items[0]!.payload).toBe(payloadWithNewlines)
    expect(items[1]!.header.type).toBe('event')
  })

  test('measures length in bytes for multi-byte characters', () => {
    const payload = 'שלום'
    const byteLength = Buffer.byteLength(payload)
    const body =
      `${envelopeHeader}\n` +
      `{"type":"attachment","length":${byteLength}}\n` +
      `${payload}\n` +
      `{"type":"event"}\n${eventPayload}`

    const items = parseEnvelope(body)

    expect(items).toHaveLength(2)
    expect(items[0]!.payload).toBe(payload)
    expect(items[1]!.header.type).toBe('event')
  })

  test('keeps non-JSON payloads as raw strings', () => {
    const body = `${envelopeHeader}\n{"type":"attachment"}\nplain text attachment`

    const items = parseEnvelope(body)

    expect(items[0]!.payload).toBe('plain text attachment')
  })

  test('tolerates a trailing newline at the end of the envelope', () => {
    const body = `${envelopeHeader}\n{"type":"event"}\n${eventPayload}\n`

    const items = parseEnvelope(body)

    expect(items).toHaveLength(1)
    expect(items[0]!.header.type).toBe('event')
  })
})

describe('handleEnvelopeRequestData', () => {
  test('captures an event even when it is not the first envelope item', () => {
    const testkit = createTestkit()
    const body =
      `${envelopeHeader}\n` +
      `{"type":"session"}\n${sessionPayload}\n` +
      `{"type":"event"}\n${eventPayload}`

    handleEnvelopeRequestData(body, testkit)

    expect(testkit.reports()).toHaveLength(1)
    expect(testkit.getExceptionAt(0)!.message).toBe('testing error')
  })

  test('routes multiple items from a single envelope', () => {
    const testkit = createTestkit()
    const body =
      `${envelopeHeader}\n` +
      `{"type":"event"}\n${eventPayload}\n` +
      `{"type":"transaction"}\n${transactionPayload}`

    handleEnvelopeRequestData(body, testkit)

    expect(testkit.reports()).toHaveLength(1)
    expect(testkit.transactions()).toHaveLength(1)
    expect(testkit.transactions()[0]!.name).toBe('test-transaction')
  })

  test('captures logs from a log container item', () => {
    const testkit = createTestkit()
    const logItems = JSON.stringify({
      items: [
        {
          timestamp: 1717081538.235,
          level: 'info',
          body: 'user logged in',
          trace_id: 'abcd1234',
          attributes: { userId: { value: 42, type: 'integer' } },
        },
        {
          timestamp: 1717081539.001,
          level: 'error',
          body: 'something failed',
        },
      ],
    })
    const body =
      `${envelopeHeader}\n` +
      `{"type":"log","item_count":2,"content_type":"application/vnd.sentry.items.log+json"}\n` +
      `${logItems}\n` +
      `{"type":"event"}\n${eventPayload}`

    handleEnvelopeRequestData(body, testkit)

    expect(testkit.logs()).toHaveLength(2)
    expect(testkit.logs()[0]!.message).toBe('user logged in')
    expect(testkit.logs()[0]!.traceId).toBe('abcd1234')
    expect(testkit.logs()[0]!.attributes['userId']).toBe(42)
    expect(testkit.logs()[1]!.level).toBe('error')
    expect(testkit.reports()).toHaveLength(1)
  })

  test('ignores unknown item types without throwing', () => {
    const testkit = createTestkit()
    const body = `${envelopeHeader}\n{"type":"session"}\n${sessionPayload}`

    expect(() => handleEnvelopeRequestData(body, testkit)).not.toThrow()
    expect(testkit.reports()).toHaveLength(0)
    expect(testkit.transactions()).toHaveLength(0)
  })
})
