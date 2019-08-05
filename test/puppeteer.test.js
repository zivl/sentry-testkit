const EventEmitter = require('events')
const sentryTestkit = require('../index.js')
const { testkit } = sentryTestkit()

describe('Puppeteer testkit', () => {
  let page
  const errorMessage = 'sentry puppeteer testkit is awesome!'
  const sentryCaptureRequest = {
    url: () => 'https://sentry.io/api/1234567/store',
    postData: () =>
      JSON.stringify({
        exception: {
          values: [{ value: errorMessage }],
        },
      }),
  }

  beforeEach(() => {
    testkit.reset()
    page = new EventEmitter()
    testkit.puppeteer.startListening(page)
  })

  test('should report to testkit', () => {
    page.emit('request', sentryCaptureRequest)
    expect(testkit.reports()).toHaveLength(1)
    const { value } = testkit.getExceptionAt(0)
    expect(value).toEqual(errorMessage)
  })

  test('should stop listening after calling stopListening', () => {
    testkit.puppeteer.stopListening(page)
    page.emit('request', sentryCaptureRequest)
    expect(testkit.reports()).toHaveLength(0)
  })
})
