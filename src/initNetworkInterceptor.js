'use strict'

const { parseDsn, parseEnvelopeRequest } = require('./parsers')
const { transformReport, transformTransaction } = require('./transformers')

const createInitNetworkInterceptor = testkit => {
  return (dsn, cb) => {
    const { protocol, host } = parseDsn(dsn)
    const baseUrl = `${protocol}://${host}`
    const handleRequestBody = requestBody =>
      testkit.reports().push(transformReport(requestBody))
    const handleEnvelopeRequestBody = requestBody => {
      const { type, payload } = parseEnvelopeRequest(requestBody)
      if (type === 'transaction') {
        testkit.transactions().push(transformTransaction(payload))
      }
    }

    return cb(baseUrl, handleRequestBody, handleEnvelopeRequestBody)
  }
}

module.exports.createInitNetworkInterceptor = createInitNetworkInterceptor
