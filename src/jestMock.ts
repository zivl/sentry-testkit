import { BrowserOptions } from '@sentry/browser'
import sentryTestkit from './index'

const { testkit, sentryTransport } = sentryTestkit()

const Sentry = jest.requireActual('@sentry/browser')

jest.mock('@sentry/browser', () =>
  Object.assign({}, Sentry, {
    init: (options: BrowserOptions) =>
      Sentry.init(Object.assign({}, options, { transport: sentryTransport })),
  }),
)

export default testkit
