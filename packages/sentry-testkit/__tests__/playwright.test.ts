import EventEmitter from 'events'
import sentryTestkit from '../src/index'

const { testkit } = sentryTestkit()

describe('Playwright testkit', () => {
  let page: EventEmitter
  const errorMessage = 'sentry playwright testkit is awesome!'
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
      {"contexts":{"trace":{"op":"transaction","span_id":"9ce5f4be9f39417f","trace_id":"57909d703068487a9e3cff52a6279484"}},"spans":[],"tags":{},"transaction":"transaction-name","type":"transaction","platform":"node","event_id":"601fdd0eb40343f08274857951e483de"}`,
  })
  const sentryLogsRequest = {
    url: () => 'https://sentry.io/api/1234567/envelope',
    postData: () => `{"sent_at":"2026-07-18T14:27:12.489Z","sdk":{"name":"sentry.javascript.node","version":"10.0.0"}}
{"type":"log","item_count":1,"content_type":"application/vnd.sentry.items.log+json"}
{"items":[{"timestamp":1717081538.235,"level":"info","body":"user logged in","attributes":{"userId":{"value":42,"type":"integer"}}}]}`,
  }
  const sentrySessionRequest = {
    url: () => 'https://sentry.io/api/1234567/envelope',
    postData: () => `{"sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.react","version":"6.11.0"}}
{"type":"session"}
{"sid":"<removed>","init":false,"started":"2021-08-17T14:27:11.361Z","timestamp":"2021-08-17T14:27:12.489Z","status":"ok","errors":1,"attrs":{"release":"<removed>","environment":"<removed>","user_agent":"<removed>"}}`,
  }

  beforeEach(() => {
    testkit.reset()
    page = new EventEmitter()
  })

  test('should report to testkit', () => {
    testkit.playwright.startListening(page)
    page.emit('request', createSentryCaptureRequest())
    expect(testkit.reports()).toHaveLength(1)
    const { message } = testkit.getExceptionAt(0)!
    expect(message).toEqual(errorMessage)
  })

  test('should collect performance transactions', () => {
    testkit.playwright.startListening(page)
    page.emit('request', createSentryPerfRequest())
    expect(testkit.transactions()).toHaveLength(1)
    expect(testkit.transactions()[0]!.name).toEqual('transaction-name')
  })

  test('should collect structured logs', () => {
    testkit.playwright.startListening(page)
    page.emit('request', sentryLogsRequest)
    expect(testkit.logs()).toHaveLength(1)
    expect(testkit.logs()[0]!.message).toEqual('user logged in')
    expect(testkit.logs()[0]!.attributes['userId']).toEqual(42)
  })

  test('should handle session items in an envelope request', () => {
    testkit.playwright.startListening(page)
    page.emit('request', sentrySessionRequest)
    expect(testkit.transactions()).toHaveLength(0)
  })

  test('should stop listening after calling stopListening', () => {
    testkit.playwright.startListening(page)
    testkit.playwright.stopListening(page)
    page.emit('request', createSentryCaptureRequest())
    expect(testkit.reports()).toHaveLength(0)
  })

  test('should not interfere with an active puppeteer listener', () => {
    const puppeteerPage = new EventEmitter()
    testkit.puppeteer.startListening(puppeteerPage)
    testkit.playwright.startListening(page)
    testkit.playwright.stopListening(page)

    page.emit('request', createSentryCaptureRequest())
    puppeteerPage.emit('request', createSentryCaptureRequest())

    expect(testkit.reports()).toHaveLength(1)
    testkit.puppeteer.stopListening(puppeteerPage)
  })

  test('should support self-hosted sentry', () => {
    const baseUrl = 'https://my-self-hosted-sentry.com'
    testkit.playwright.startListening(page, baseUrl)
    page.emit('request', createSentryCaptureRequest(baseUrl))
    expect(testkit.reports()).toHaveLength(1)
  })
})
