'use strict'

const { parseEnvelopeRequest } = require('./parsers')
const { transformReport, transformTransaction } = require('./transformers')

function getException(report) {
  return report.error
}

module.exports.createTestkit = () => {
  let reports = []
  let transactions = []

  let puppeteerHandler = null
  const createPuppeteerHandler = baseUrl => request => {
    const url = request.url()
    if (!url.startsWith(baseUrl)) {
      return
    }
    const path = url.substring(baseUrl.length)
    if (/\/api\/[0-9]*\/store/.test(path)) {
      reports.push(transformReport(JSON.parse(request.postData())))
    }
    if (/\/api\/[0-9]*\/envelope/.test(path)) {
      const { type, payload } = parseEnvelopeRequest(request.postData())
      if (type === 'transaction') {
        transactions.push(transformTransaction(payload))
      }
    }
  }

  return {
    puppeteer: {
      startListening: (page, baseUrl = 'https://sentry.io') => {
        puppeteerHandler = createPuppeteerHandler(baseUrl)
        page.on('request', puppeteerHandler)
      },

      stopListening: page => {
        page.removeListener('request', puppeteerHandler)
      },
    },

    reports() {
      return reports
    },

    transactions() {
      return transactions
    },

    reset() {
      reports = []
      transactions = []
    },

    getExceptionAt(index) {
      return getException(reports[index])
    },

    findReport(e) {
      return reports.find(r => {
        const err = getException(r)
        return err.name === e.name && err.message === e.message
      })
    },

    isExist(e) {
      return this.findReport(e) !== undefined
    },
  }
}
