'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')

const { parseDsn, parseEnvelopeRequest } = require('./parsers')
const { transformReport, transformTransaction } = require('./transformers')

const createLocalServerApi = testkit => {
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
    app.use(
      bodyParser.text({
        type: ['application/json', 'application/x-sentry-envelope'],
      })
    )
    app.post(`/api/${project}/store/`, (req, res) => {
      testkit.reports().push(transformReport(JSON.parse(req.body)))
      res.sendStatus(200)
    })
    app.post(`/api/${project}/envelope/`, (req, res) => {
      const { type, payload } = parseEnvelopeRequest(req.body)
      if (type === 'transaction') {
        testkit.transactions().push(transformTransaction(payload))
      }
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

module.exports.createLocalServerApi = createLocalServerApi
