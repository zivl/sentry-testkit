import * as Sentry from '@sentry/browser'
import { BrowserOptions } from '@sentry/browser'
import sentryTestkit from './index'

const sentryTestkitInstance = sentryTestkit()

jest.mock('@sentry/browser', () => {
  return Object.assign({}, Sentry, {
    init: (options: BrowserOptions) =>
      Sentry.init({
        ...options,
        transport: sentryTestkitInstance.sentryTransport,
      }),
  })
})

export const testkit = sentryTestkitInstance.testkit
