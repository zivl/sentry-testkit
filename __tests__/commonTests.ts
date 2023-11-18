import * as NodeSentry from '@sentry/node'
import * as BrowserSentry from '@sentry/browser'
import waitForExpect from 'wait-for-expect'
import { Testkit } from '../src/types'

export function createCommonTests({
  Sentry,
  testkit,
}: {
  Sentry: typeof NodeSentry | typeof BrowserSentry
  testkit: Testkit
}) {
  beforeEach(() => {
    Sentry.configureScope(scope => scope.clearBreadcrumbs())
  })

  test('should return an empty breadcrumbs array when there are no breadcrumbs', async function() {
    Sentry.captureException(new Error('sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()[0]!.breadcrumbs).toEqual([])
  })

  test('should return a breadcrumbs array', async function() {
    const breadcrumb = { message: 'breadcrumb' }
    Sentry.addBreadcrumb(breadcrumb)
    Sentry.captureException(new Error('sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()[0]!.breadcrumbs).toMatchObject([breadcrumb])
  })

  test('should return report.message when using captureMessage', async function() {
    const message = 'sentry test kit is awesome!'
    Sentry.captureMessage(message)
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()[0]!.message).toEqual(message)
  })

  test('should return report.level "error" when a level is not provided', async function() {
    Sentry.captureException(new Error('sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()[0]!.level).toEqual('error')
  })

  test('should return the provided level', async function() {
    Sentry.configureScope(scope => {
      scope.setLevel('warning')
      Sentry.captureException(new Error('sentry test kit is awesome!'))
    })

    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()[0]!.level).toEqual('warning')
  })

  test('should return an empty tags object when there are no tags', async function() {
    Sentry.captureException(new Error('sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()[0]!.tags).toEqual({})
  })

  test('should return the original report', async function() {
    Sentry.captureException(new Error('sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()[0]!.originalReport).toBeDefined()
    expect(testkit.reports()[0]!.originalReport).toHaveProperty(
      'event_id',
      expect.any(String)
    )
  })

  test('should be properly initialized with empty reports', function() {
    expect(testkit).toBeDefined()
    expect(testkit.reports()).toHaveLength(0)
  })

  test('should report to test kit instead of sending http request', async function() {
    Sentry.captureException(new Error('sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
  })

  test('should have an error object with the captured exception and stacktrace', async function() {
    Sentry.captureException(new Error('sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()[0]!.error).toMatchObject({
      name: 'Error',
      message: 'sentry test kit is awesome!',
      stacktrace: {
        frames: expect.any(Array),
      },
    })
  })

  test('should have release data on the report as given in Sentry.init', async function() {
    Sentry.captureException(new Error('sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    const report = testkit.reports()[0]
    expect(report).toHaveProperty('release', 'test')
  })

  test("should not harm Sentry event's reporting life-cycle - return eventId", async function() {
    const eventId = Sentry.captureException(
      new Error('sentry test kit is awesome!')
    )
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(eventId).toEqual(expect.anything())
  })

  test("should not harm Sentry event's reporting life-cycle - call beforeSend hook with extra data", async function() {
    Sentry.captureException(new Error('Sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    const report = testkit.reports()[0]!
    expect(report.extra).toMatchObject({ os: 'mac-os' })
  })

  test('should extract the exception out of the report at specific index', async function() {
    Sentry.captureException(new Error('testing get exception at index 0'))
    Sentry.captureException(new Error('testing get exception at index 1'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(2))
    const { message } = testkit.getExceptionAt(1)!
    expect(message).toEqual('testing get exception at index 1')
  })

  test('should find the report with a specific error', async function() {
    const err = new Error('error to look for')
    Sentry.captureException(err)
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    const report = testkit.findReport(err)
    expect(report).toBeDefined()
  })

  test('should not find the report with a specific error', async function() {
    Sentry.captureException(new Error('simple error'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    const report = testkit.findReport(new Error('error to look for'))
    expect(report).toBeUndefined()
  })

  test('should reset and empty the reports log', async function() {
    Sentry.captureException(new Error('Sentry test kit is awesome!'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.reports()).toHaveLength(1)
    testkit.reset()
    expect(testkit.reports()).toHaveLength(0)
  })

  test('isExist returns true if the report with a specific error has been reported', async function() {
    Sentry.captureException(new Error('simple error'))
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.isExist(new Error('error to look for'))).toBe(false)
  })

  test('isExist returns false if the report with a specific error has not been reported', async function() {
    const err = new Error('error to look for')
    Sentry.captureException(err)
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(testkit.isExist(err)).toBe(true)
  })

  test('should allow flush be called', async function() {
    const err = new Error('error to look for')
    Sentry.captureException(err)
    await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
    expect(() => Sentry.flush()).not.toThrow()
  })

  describe('performance', () => {
    test('should collect transactions', async function() {
      Sentry.startTransaction({
        op: 'transaction',
        name: 'transaction-name',
      }).finish()
      await waitForExpect(() => expect(testkit.transactions()).toHaveLength(1))
      expect(testkit.transactions()[0]!.name).toEqual('transaction-name')
      expect(testkit.transactions()[0]!.release).toEqual('test')
    })

    test('should support tags', async function() {
      Sentry.startTransaction({
        op: 'transaction',
        name: 'transaction-name',
        tags: { a: 1, b: 2 },
      }).finish()
      await waitForExpect(() => expect(testkit.transactions()).toHaveLength(1))
      expect(testkit.transactions()[0]!.tags).toEqual({ a: 1, b: 2 })
    })

    test('should support extra data', async function() {
      Sentry.withScope(scope => {
        scope.setExtra('hello', 'world')
        Sentry.startTransaction({
          op: 'transaction',
          name: 'transaction-name',
        }).finish()
      })
      await waitForExpect(() => expect(testkit.transactions()).toHaveLength(1))
      expect(testkit.transactions()[0]!.extra).toEqual({ hello: 'world' })
    })

    test('should collect child spans', async function() {
      const transaction = Sentry.startTransaction({
        op: 'transaction',
        name: 'transaction-name',
      })
      const child = transaction.startChild({
        op: 'child',
        description: 'child-description',
      })
      child.finish()
      transaction.finish()
      await waitForExpect(() => expect(testkit.transactions()).toHaveLength(1))
      expect(testkit.transactions()[0]!.spans[0]).toEqual({
        id: child.spanId,
        op: 'child',
        description: 'child-description',
        parentSpanId: child.parentSpanId,
      })
    })
  })
}
