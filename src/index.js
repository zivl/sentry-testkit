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

function parseEnvelopeRequest(reqBody) {
  const [_header, itemHeader, itemPayload] = reqBody.split('\n')
  return {
    type: JSON.parse(itemHeader).type,
    payload: JSON.parse(itemPayload),
  }
}

function parsePerfRequest(reqBody) {
  return JSON.parse(reqBody.split('\n')[2])
}

function transformTransaction(item) {
  return {
    name: item.transaction,
    traceId: item.contexts.trace.trace_id,
    release: item.release,
    tags: item.tags || {},
    extra: item.extra,
    spans: item.spans.map(span => ({
      id: span.span_id || span.spanId,
      op: span.op,
      parentSpanId: span.parent_span_id || span.parentSpanId,
      description: span.description,
    })),
  }
}

module.exports = () => {
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

  const createLocalServerApi = () => {
    let runningServer = null
    let localDsn = null

    const start = userDsn => {
      if (runningServer !== null) {
        throw new Error('Local server is already running')
      }

      const { project } = parseDsn(userDsn)
      const app = express()
      // the performance endpoint uses a custom non-json payload so
      // we can't use bodyParser.json() directly
      app.use(bodyParser.text({ type: 'application/json' }))
      app.post(`/api/${project}/store/`, (req, res) => {
        reports.push(transformReport(JSON.parse(req.body)))
        res.sendStatus(200)
      })
      app.post(`/api/${project}/envelope/`, (req, res) => {
        const json = parsePerfRequest(req.body)
        transactions.push(transformTransaction(json))
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
      const sendEvent = function(event) {
        if (event.type === 'transaction') {
          transactions.push(transformTransaction(event))
        } else {
          reports.push(transformReport(event))
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
    },
    initNetworkInterceptor: (dsn, cb) => {
      const { protocol, host } = parseDsn(dsn)
      const baseUrl = `${protocol}://${host}`
      const handleRequestBody = requestBody =>
        reports.push(transformReport(requestBody))
      const handleEnvelopeRequestBody = requestBody => {
        const { type, payload } = parseEnvelopeRequest(requestBody)
        if (type === 'transaction') {
          transactions.push(transformTransaction(payload))
        }
      }

      return cb(baseUrl, handleRequestBody, handleEnvelopeRequestBody)
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
    },
  }
}
