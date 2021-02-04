'use strict'
const Sentry = require('@sentry/browser')
const sentryTestkit = require('./index')

const { testkit, sentryTransport } = sentryTestkit()

jest.mock('@sentry/browser', () =>
  Object.assign({}, Sentry, {
    init: options =>
      Sentry.init(Object.assign({}, options, { transport: sentryTransport })),
  })
)

module.exports.testkit = testkit
