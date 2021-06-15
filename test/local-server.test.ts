import path from 'path'
import execa from 'execa'
import waitForExpect from 'wait-for-expect'
import sentryTestkit from '../src'

const { testkit, localServer } = sentryTestkit()
const DUMMY_DSN = 'http://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('sentry test-kit test suite - local server', function () {
  beforeAll(() => localServer.start(DUMMY_DSN))

  afterAll(() => localServer.stop())

  beforeEach(() => testkit.reset())

  test('should report to test kit from an external process', async function () {
    const dsn = localServer.getDsn() as string
    const errorMessage = 'sentry test kit is awesome!'
    execa
      .node(path.join(__dirname, './fixtures/external-app.js'), [
        dsn,
        errorMessage,
      ])
      ?.stdout?.pipe(process.stdout)

    await waitForExpect(() => {
      expect(testkit.reports()?.[0]?.error).toMatchObject({
        name: 'Error',
        message: errorMessage,
      })
    })
  })

  test('should collect performance transactions', async function () {
    const dsn = localServer.getDsn() as string

    execa
      .node(path.join(__dirname, './fixtures/external-app-perf.js'), [dsn])
      ?.stdout
      ?.pipe(process.stdout)

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
