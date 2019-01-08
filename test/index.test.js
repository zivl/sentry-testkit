
const BrowserSentry = require('@sentry/browser')
const waitForExpect = require('wait-for-expect')
const sentryTestkit = require('../index.js')

const {testkit, sentryTransport} = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('sentry test-kit test suite', function() {

    beforeAll(() =>
        BrowserSentry.init({
            dsn: DUMMY_DSN,
            release: 'test',
            transport: sentryTransport,
            beforeSend(event) {
                event.extra = { os: 'mac-os' }
                return event
            }
        })
    )

    beforeEach(() => testkit.reset())

    test('should be properly initialized with empty reports', function() {
        expect(testkit).toBeDefined()
        expect(testkit.reports()).toHaveLength(0)
    })

    test('should report to test kit instead of sending http request', async function() {
        BrowserSentry.captureException(new Error('sentry test kit is awesome!'))
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        expect(testkit.reports()[0].exception).toMatchObject({
            values: [{type:'Error', value: 'sentry test kit is awesome!'}]
        })
    })

    test('should have release data on the report as given in Sentry.init', async function() {
        BrowserSentry.captureException(new Error('sentry test kit is awesome!'))
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        const report = testkit.reports()[0]
        expect(report).toHaveProperty('release', 'test')
    })

    test('should not harm Sentry event\'s reporting life-cycle - return eventId', async function() {
        const eventId = BrowserSentry.captureException(new Error('sentry test kit is awesome!'))
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        expect(eventId).toEqual(expect.anything())
    })

    test('should not harm Sentry event\'s reporting life-cycle - call beforeSend hook with extra data', async function() {
        BrowserSentry.captureException(new Error('raven test kit is awesome!'))
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        const report = testkit.reports()[0]
        expect(report.extra).toMatchObject({ os: 'mac-os' })
    })

    test('should extract the exception out of the report', async function() {
        BrowserSentry.captureException(new Error('testing exception extraction'))
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        const report = testkit.reports()[0]
        const {type, value} = testkit.extractException(report)
        expect(type).toEqual('Error')
        expect(value).toEqual('testing exception extraction')
    })

    test('should extract the exception out of the report at specific index', async function() {
        BrowserSentry.captureException(new Error('testing get exception at index 0'))
        BrowserSentry.captureException(new Error('testing get exception at index 1'))
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(2))
        const {value} = testkit.getExceptionAt(1)
        expect(value).toEqual('testing get exception at index 1')
    })

    test('should find the report with a specific error', async function() {
        const err = new Error('error to look for')
        BrowserSentry.captureException(err)
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        const report = testkit.findReport(err)
        expect(report).toBeDefined()
    })

    test('should not find the report with a specific error', async function() {
        BrowserSentry.captureException(new Error('simple error'))
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        const report = testkit.findReport(new Error('error to look for'))
        expect(report).toBeUndefined()
    })

    test('should reset and empty the reports log', async function() {
        BrowserSentry.captureException(new Error('raven test kit is awesome!'))
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        expect(testkit.reports()).toHaveLength(1)
        testkit.reset()
        expect(testkit.reports()).toHaveLength(0)
    })

    test('isExist returns true if the report with a specific error has been reported', async function() {
        BrowserSentry.captureException(new Error('simple error'))
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        expect(testkit.isExist(new Error('error to look for'))).toBe(false)
    })

    test('isExist returns false if the report with a specific error has not been reported', async function() {
        const err = new Error('error to look for')
        BrowserSentry.captureException(err)
        await waitForExpect(() => expect(testkit.reports()).toHaveLength(1))
        expect(testkit.isExist(err)).toBe(true)
    })
})
