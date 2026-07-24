import * as Sentry from '@sentry/node'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('sentry test-kit test suite - user feedback', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      transport: sentryTransport,
    })
  )

  beforeEach(() => testkit.reset())

  test('feedback() is empty when nothing was submitted', () => {
    expect(testkit.feedback()).toEqual([])
  })

  test('captures a submitted feedback with its message and contact fields', async () => {
    Sentry.captureFeedback({
      message: 'the checkout page is confusing',
      name: 'Jane Doe',
      email: 'jane@example.com',
      url: 'https://shop.example.com/checkout',
    })
    const [feedback] = await testkit.waitForFeedback(1)

    expect(feedback!.message).toBe('the checkout page is confusing')
    expect(feedback!.name).toBe('Jane Doe')
    expect(feedback!.contactEmail).toBe('jane@example.com')
    expect(feedback!.url).toBe('https://shop.example.com/checkout')
    expect(feedback!.eventId).toEqual(expect.any(String))
  })

  test('links feedback to the associated error event', async () => {
    const eventId = Sentry.captureException(new Error('boom'))
    Sentry.captureFeedback({
      message: 'this errored for me too',
      associatedEventId: eventId,
    })
    const [feedback] = await testkit.waitForFeedback(1)

    expect(feedback!.associatedEventId).toBe(eventId)
  })

  test('exposes the raw feedback event as originalFeedback', async () => {
    Sentry.captureFeedback({ message: 'raw access' })
    const [feedback] = await testkit.waitForFeedback(1)

    expect(feedback!.originalFeedback.type).toBe('feedback')
    expect(feedback!.originalFeedback.contexts.feedback.message).toBe(
      'raw access'
    )
  })

  test('does not record feedback as a report', async () => {
    Sentry.captureFeedback({ message: 'not an error' })
    await testkit.waitForFeedback(1)

    expect(testkit.reports()).toHaveLength(0)
  })

  test('reset() clears captured feedback', async () => {
    Sentry.captureFeedback({ message: 'to be cleared' })
    await testkit.waitForFeedback(1)

    testkit.reset()

    expect(testkit.feedback()).toHaveLength(0)
  })
})
