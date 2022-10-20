import path from 'path'
import execa from 'execa'
import fetch from 'node-fetch'
import waitForExpect from 'wait-for-expect'
import sentryTestkit from '../src/index'

const { testkit, localServer } = sentryTestkit()
const PROJECT_ID = '000001'
const DUMMY_DSN = `http://acacaeaccacacacabcaacdacdacadaca@sentry.io/${PROJECT_ID}`

describe('sentry test-kit test suite - local server', function() {
  beforeAll(() => localServer.start(DUMMY_DSN))

  afterAll(() => localServer.stop())

  beforeEach(() => testkit.reset())

  test('should report to test kit from an external process', async function() {
    const dsn = localServer.getDsn() as string
    const errorMessage = 'sentry testkit is awesome!'
    execa
      .node(path.join(__dirname, './fixtures/external-app.js'), [
        dsn,
        errorMessage,
      ])
      ?.stdout?.pipe(process.stdout)

    await waitForExpect(() => {
      expect(testkit.reports()[0]).toBeDefined()
      expect(testkit.reports()[0]!.error).toMatchObject({
        name: 'Error',
        message: errorMessage,
      })
    })
  })

  test('should collect performance transactions', async function() {
    const dsn = localServer.getDsn() as string
    execa
      .node(path.join(__dirname, './fixtures/external-app-perf.js'), [dsn])
      ?.stdout?.pipe(process.stdout)

    await waitForExpect(() => {
      expect(testkit.transactions()[0]).toMatchObject({
        name: 'transaction-name',
        traceId: expect.any(String),
        spans: [
          {
            id: expect.any(String),
            op: 'child-span',
            description: 'child-description',
          },
        ],
      })
    })
  })

  test('should handle session items in an envelope request', async function() {
    const dsn = localServer.getDsn()?.replace(`/${PROJECT_ID}`, '')
    const sessionEnvelopeBody =
      `{"sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.react","version":"6.11.0"}}\n` +
      `{"type":"session"}\n` +
      `{"sid":"<removed>","init":false,"started":"2021-08-17T14:27:11.361Z","timestamp":"2021-08-17T14:27:12.489Z","status":"ok","errors":1,"attrs":{"release":"<removed>","environment":"<removed>","user_agent":"<removed>"}}`

    const response = await fetch(`${dsn}/api/${PROJECT_ID}/envelope/`, {
      method: 'POST',
      body: sessionEnvelopeBody,
      headers: { 'Content-Type': 'application/x-sentry-envelope' },
    })
    expect(response.ok).toBe(true)
  })

  test('should handle text/plain encoded items in an envelope request', async function() {
    const dsn = localServer.getDsn()?.replace(`/${PROJECT_ID}`, '')
    const sessionEnvelopeBody =
      `{"sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.react","version":"6.11.0"}}\n` +
      `{"type":"session"}\n` +
      `{"sid":"<removed>","init":false,"started":"2021-08-17T14:27:11.361Z","timestamp":"2021-08-17T14:27:12.489Z","status":"ok","errors":1,"attrs":{"release":"<removed>","environment":"<removed>","user_agent":"<removed>"}}`

    const response = await fetch(`${dsn}/api/${PROJECT_ID}/envelope/`, {
      method: 'POST',
      body: sessionEnvelopeBody,
      headers: { 'Content-Type': 'text/plain' },
    })
    expect(response.ok).toBe(true)
  })

  test('responds with Access-Control-Allow-Origin header', async function() {
    const dsn = localServer.getDsn()?.replace(`/${PROJECT_ID}`, '')
    const sessionEnvelopeBody =
      `{"sent_at":"2021-08-17T14:27:12.489Z","sdk":{"name":"sentry.javascript.react","version":"6.11.0"}}\n` +
      `{"type":"session"}\n` +
      `{"sid":"<removed>","init":false,"started":"2021-08-17T14:27:11.361Z","timestamp":"2021-08-17T14:27:12.489Z","status":"ok","errors":1,"attrs":{"release":"<removed>","environment":"<removed>","user_agent":"<removed>"}}`

    const response = await fetch(`${dsn}/api/${PROJECT_ID}/envelope/`, {
      method: 'POST',
      body: sessionEnvelopeBody,
      headers: { 'Content-Type': 'text/plain' },
    })
    expect(response.ok).toBe(true)
    expect(response.headers.get('access-control-allow-origin')).toBe('*')
  })
})

describe('local server testkit error cases', () => {
  test('should throw when stopping an unstarted server', () => {
    expect(localServer.stop).toThrowError('Local server is not running')
  })

  test('should throw when starting an already started server', async () => {
    await localServer.start(DUMMY_DSN)

    try {
      expect(localServer.start).toThrowError('Local server is already running')
    } finally {
      await localServer.stop()
    }
  })

  test('should throw when getting dsn of an unstarted server', () => {
    expect(localServer.getDsn).toThrowError('Local server is not running')
  })
})
