'use strict'

const { createTestkit } = require('./testkit')
const { createInitNetworkInterceptor } = require('./initNetworkInterceptor')
const { createSentryTransport } = require('./sentryTransport')

module.exports = () => {
  const testkit = createTestkit()
  const sentryTransport = createSentryTransport(testkit)
  const initNetworkInterceptor = createInitNetworkInterceptor(testkit)

  return {
    sentryTransport,
    testkit,
    initNetworkInterceptor,
  }
}
