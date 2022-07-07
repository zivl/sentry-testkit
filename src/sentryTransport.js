'use strict'

const { transformReport, transformTransaction } = require('./transformers')

const createSentryTransport = testkit => {
  return function() {
    // Send transport for API < v7
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

    // Send transport for API v7
    const send = function(envelope) {
      const [, items] = envelope

      items.forEach(([headers, data], index) => {
        if (headers.type === 'transaction') {
          testkit.transactions().push(transformTransaction(data))
        } else if (headers.type === 'event') {
          testkit.reports().push(transformReport(data))
        }
      })

      return Promise.resolve()
    }

    const close = function() {
      return Promise.resolve(true)
    }

    return {
      // captureEvent(event: SentryEvent): Promise<SentryResponse>;
      captureEvent: sendEvent, // support for v4 API
      sendEvent, // support for v5 API
      send, // support for v7 API

      // close(timeout?: number): Promise<boolean>;
      close,
      flush: close, // support for v7 API
    }
  }
}

module.exports.createSentryTransport = createSentryTransport
