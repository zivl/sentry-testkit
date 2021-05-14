const Sentry = require('@sentry/browser')
const sentryTestkit = require('./index')

const { testkit, sentryTransport } = sentryTestkit()

jest.mock('@sentry/browser', () =>
  Object.assign({}, Sentry, {
    init: (options: import('@sentry/browser').BrowserOptions) =>
      Sentry.init({
        ...options,
        transport: sentryTransport,
      }),
  })
)

module.exports.testkit = testkit
