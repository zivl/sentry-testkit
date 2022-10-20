import * as Sentry from '@sentry/browser'
import { BrowserOptions } from '@sentry/browser'
import sentryTestkit from './index'

const { testkit, sentryTransport } = sentryTestkit()

jest.mock('@sentry/browser', () =>
  Object.assign({}, Sentry, {
    init: (options: BrowserOptions) =>
      Sentry.init(Object.assign({}, options, { transport: sentryTransport })),
  })
)

export default testkit
