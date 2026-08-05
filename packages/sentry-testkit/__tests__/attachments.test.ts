import * as Sentry from '@sentry/node'
import sentryTestkit from '../src/index'

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('sentry test-kit test suite - attachments', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      transport: sentryTransport,
    })
  )

  beforeEach(() => testkit.reset())

  test('attachments() is empty when nothing was attached', () => {
    expect(testkit.attachments()).toEqual([])
  })

  test('captures an attachment sent with an error', async () => {
    Sentry.captureException(new Error('failed to import'), {
      attachments: [
        {
          filename: 'import.csv',
          data: 'id,name\n1,jane',
          contentType: 'text/csv',
        },
      ],
    })
    const [attachment] = await testkit.waitForAttachments(1)

    expect(attachment!.filename).toBe('import.csv')
    expect(attachment!.contentType).toBe('text/csv')
    expect(attachment!.text).toBe('id,name\n1,jane')
  })

  test('exposes attachments on the report they were sent with', async () => {
    Sentry.captureException(new Error('failed to import'), {
      attachments: [{ filename: 'import.csv', data: 'id,name\n1,jane' }],
    })
    const [report] = await testkit.waitForReports(1)

    expect(report!.attachments).toHaveLength(1)
    expect(report!.attachments[0]!.filename).toBe('import.csv')
    expect(report!.attachments[0]!.text).toBe('id,name\n1,jane')
  })

  test('captures attachments added to the scope', async () => {
    Sentry.withScope(scope => {
      scope.addAttachment({ filename: 'scope.txt', data: 'from the scope' })
      Sentry.captureException(new Error('scoped error'))
    })
    const [attachment] = await testkit.waitForAttachments(1)

    expect(attachment!.filename).toBe('scope.txt')
    expect(attachment!.text).toBe('from the scope')
  })

  test('captures several attachments sent with one error', async () => {
    Sentry.captureException(new Error('two attachments'), {
      attachments: [
        { filename: 'first.txt', data: 'first' },
        { filename: 'second.txt', data: 'second' },
      ],
    })
    const attachments = await testkit.waitForAttachments(2)

    expect(attachments.map(attachment => attachment.filename)).toEqual([
      'first.txt',
      'second.txt',
    ])
    const [report] = testkit.reports()
    expect(report!.attachments).toHaveLength(2)
  })

  test('keeps binary attachment data intact', async () => {
    const data = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x00, 0xff])
    Sentry.captureException(new Error('with a screenshot'), {
      attachments: [
        { filename: 'screenshot.png', data, contentType: 'image/png' },
      ],
    })
    const [attachment] = await testkit.waitForAttachments(1)

    expect(Array.from(attachment!.data)).toEqual(Array.from(data))
  })

  test('reports sent without attachments expose an empty array', async () => {
    Sentry.captureException(new Error('no attachments here'))
    const [report] = await testkit.waitForReports(1)

    expect(report!.attachments).toEqual([])
    expect(testkit.attachments()).toEqual([])
  })

  test('waitForAttachments rejects with a descriptive error on timeout', async () => {
    await expect(
      testkit.waitForAttachments(1, { timeout: 50 })
    ).rejects.toThrow(
      'Expected at least 1 attachments within 50ms, but only 0 were captured'
    )
  })

  test('reset() clears captured attachments', async () => {
    Sentry.captureException(new Error('to be cleared'), {
      attachments: [{ filename: 'clear.txt', data: 'bye' }],
    })
    await testkit.waitForAttachments(1)

    testkit.reset()

    expect(testkit.attachments()).toHaveLength(0)
  })
})
