const EventEmitter = require('events')
const sentryTestkit = require('../src/index')
const { testkit } = sentryTestkit()

describe('Puppeteer testkit', () => {
  let page
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

  beforeEach(() => {
    testkit.reset()
    page = new EventEmitter()
  })

  test('should report to testkit', () => {
    testkit.puppeteer.startListening(page)
    page.emit('request', createSentryCaptureRequest())
    expect(testkit.reports()).toHaveLength(1)
    const { message } = testkit.getExceptionAt(0)
    expect(message).toEqual(errorMessage)
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
