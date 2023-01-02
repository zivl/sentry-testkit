import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import { parseDsn, handleEnvelopeRequestData } from './parsers'
import { transformReport } from './transformers'
import { Testkit } from './types'

export function createLocalServerApi(testkit: Testkit) {
  let runningServer: http.Server | null = null
  let localDsn: string | null = null

  const start = (userDsn: string) => {
    if (runningServer !== null) {
      throw new Error('Local server is already running')
    }

    const { project } = parseDsn(userDsn)
    const app = express()
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      next()
    })
    // We accept any content-type as requests come in a variety of
    // kinds (with content-type and without, compressed and not, ...).
    app.use(bodyParser.text({ type: () => true }))
    app.post(`/api/${project}/store/`, (req, res) => {
      testkit.reports().push(transformReport(JSON.parse(req.body)))
      res.sendStatus(200)
    })
    app.post(`/api/${project}/envelope/`, (req, res) => {
      handleEnvelopeRequestData(req.body, testkit)
      res.sendStatus(200)
    })
    runningServer = http.createServer(app)

    return new Promise(resolve => {
      if (runningServer) {
        runningServer.listen(() => {
          // @ts-expect-error
          const port = runningServer.address().port
          localDsn = `http://acacaeaccacacacabcaacdacdacadaca@localhost:${port}/${project}`
          resolve(undefined)
        })
      } else {
        throw new Error('Local server is not running')
      }
    })
  }

  const stop = () => {
    if (runningServer === null) {
      throw new Error('Local server is not running')
    }

    return new Promise((resolve, reject) => {
      runningServer!.close(error =>
        error ? reject(error) : resolve(undefined)
      )
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
