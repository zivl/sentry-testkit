'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const { parseDsn } = require('./parseDsn')

function getException(report) {
  return report.error
}

function transformReport(report) {
  const exception =
    report.exception && report.exception.values && report.exception.values[0]
  const error = exception
    ? {
        name: exception.type,
        message: exception.value,
        stacktrace: exception.stacktrace,
      }
    : undefined

  return {
    breadcrumbs: report.breadcrumbs || [],
    error,
    message: report.message,
    extra: report.extra,
    level: report.level || 'error',
    release: report.release,
    user: report.user,
    tags: report.tags || {},
    originalReport: report,
  }
}

module.exports = () => {
  let reports = []

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
  }

  const createLocalServerApi = () => {
    let runningServer = null
    let localDsn = null

    const start = userDsn => {
      if (runningServer !== null) {
        throw new Error('Local server is already running')
      }

      const { project } = parseDsn(userDsn)
      const app = express()
      app.use(bodyParser.json())
      app.post(`/api/${project}/store/`, (req, res) => {
        reports.push(transformReport(req.body))
        res.sendStatus(200)
      })
      runningServer = http.createServer(app)

      return new Promise(resolve => {
        runningServer.listen(() => {
          const port = runningServer.address().port
          localDsn = `http://acacaeaccacacacabcaacdacdacadaca@localhost:${port}/${project}`
          resolve()
        })
      })
    }

    const stop = () => {
      if (runningServer === null) {
        throw new Error('Local server is not running')
      }

      return new Promise((resolve, reject) => {
        runningServer.close(error => (error ? reject(error) : resolve()))
        runningServer = null
        localDsn = null
      })
    }

    const getDsn = () => {
      if (runningServer === null) {
        throw new Error('Local server is not running')
      }

      return localDsn
    }

    return {
      start,
      stop,
      getDsn,
    }
  }

  return {
    sentryTransport: function(options) {
      const sendEvent = function(report) {
        reports.push(transformReport(report))
        return Promise.resolve({
          status: 'success',
          event: report,
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
    },
    initNetworkInterceptor: (dsn, cb) => {
      const { protocol, host } = parseDsn(dsn)
      const baseUrl = `${protocol}://${host}`
      const handleRequestBody = requestBody =>
        reports.push(transformReport(requestBody))

      return cb(baseUrl, handleRequestBody)
    },
    localServer: createLocalServerApi(),
    testkit: {
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

      reset() {
        reports = []
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
    },
  }
}
