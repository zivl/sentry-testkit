'use strict'

import { createTestkit } from './testkit'
import { createInitNetworkInterceptor } from './initNetworkInterceptor'
import { createSentryTransport } from './sentryTransport'

export default function() {
  const testkit = createTestkit()
  const sentryTransport = createSentryTransport(testkit)
  const initNetworkInterceptor = createInitNetworkInterceptor(testkit)

  return {
    sentryTransport,
    testkit,
    initNetworkInterceptor,
  }
}
