'use strict'

function getException(report) {
  return report.exception.values[0]
}

module.exports = () => {
  let reports = []
  const puppeteerHandler = request => {
    if (/https:\/\/sentry\.io\/api\/[0-9]*\/store/.test(request.url())) {
      reports.push(JSON.parse(request.postData()))
    }
  }
  return {
    sentryTransport: function(options) {
      const sendEvent = function(report) {
        reports.push(report)
        return Promise.resolve({
          status: 'success',
          event: report,
        })
      }

      return {
        // captureEvent(event: SentryEvent): Promise<SentryResponse>;
        captureEvent: sendEvent, // support for v4 API
        sendEvent, // support for v5 API
      }
    },
    testkit: {
      puppeteer: {
        startListening: page => {
          page.on('request', puppeteerHandler)
        },

        stopListening: page => {
          page.removeListener('request', puppeteerHandler)
        },
      },

      reports() {
        return reports
      },

      reset() {
        reports = []
      },

      extractException(report) {
        return getException(report)
      },

      getExceptionAt(index) {
        return getException(reports[index])
      },

      findReport(e) {
        return reports.find(r => {
          const err = getException(r)
          return err.type === e.name && err.value === e.message
        })
      },

      isExist(e) {
        return this.findReport(e) !== undefined
      },
    },
  }
}
