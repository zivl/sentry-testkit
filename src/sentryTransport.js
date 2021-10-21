'use strict'

const { transformReport, transformTransaction } = require('./transformers')

const createSentryTransport = testkit => {
  return function(options) {
    const sendEvent = function(event) {
      if (event.type === 'transaction') {
        testkit.transactions().push(transformTransaction(event))
      } else {
        testkit.reports().push(transformReport(event))
      }

      return Promise.resolve({
        status: 'success',
        event,
      })
    }

    const close = function() {
      return Promise.resolve(true)
    }

    return {
      // captureEvent(event: SentryEvent): Promise<SentryResponse>;
      captureEvent: sendEvent, // support for v4 API
      sendEvent, // support for v5 API

      // close(timeout?: number): Promise<boolean>;
      close,
    }
  }
}

module.exports.createSentryTransport = createSentryTransport
