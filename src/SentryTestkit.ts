import { Report } from './types'
import { Handler, HTTPRequest, Page } from 'puppeteer-core'
import http from 'http'
import { parseDsn } from './parseDsn'
import express from 'express'
import bodyParser from 'body-parser'
import { AddressInfo } from 'net'

import { Event } from '@sentry/browser'
import { Transport } from '@sentry/types'
import { getException, transformReport } from './utils'
import { Response } from '@sentry/types/dist/response'

class SentryTestkit {
  private reportsList: Report[] = []
  private puppeteerHandler: Handler<HTTPRequest> | null = null

  localServer: {
    start(userDns: string): Promise<void>
    stop: () => Promise<void>
    getDsn: () => string | null
  }

  constructor() {
    this.localServer = this.createLocalServerApi()
  }

  get sentryTransport() {
    const sendEvent = (event: Event) => {
      this.reportsList.push(transformReport(event))
      return Promise.resolve({
        status: 'success',
        event,
      } as Response)
    }

    return class SentryTestkitTransport implements Transport {
      // support for v4 API
      captureEvent(event: Event) {
        return sendEvent(event)
      }
      // support for v5 API
      sendEvent(event: Event): Promise<Response> {
        return sendEvent(event)
      }

      close(_timeout?: number): Promise<boolean> {
        return Promise.resolve(true)
      }
    }
  }

  initNetworkInterceptor = (
    dsn: string,
    cb: (baseUrl: string, requestBody: any) => void
  ) => {
    const { protocol, host } = parseDsn(dsn)
    const baseUrl = `${protocol}://${host}`
    const handleRequestBody = (requestBody: Event) =>
      this.reportsList.push(transformReport(requestBody))

    return cb(baseUrl, handleRequestBody)
  }

  get testkit() {
    return {
      puppeteer: {
        startListening: (page: Page, baseUrl = 'https://sentry.io') => {
          this.puppeteerHandler = this.createPuppeteerHandler(baseUrl)
          page.on('request', this.puppeteerHandler)
        },

        stopListening: (page: Page) => {
          if (this.puppeteerHandler) {
            page.off('request', this.puppeteerHandler)
          }
        },
      },

      reports: () => {
        return this.reportsList
      },

      reset: () => {
        this.reportsList = [] as Report[]
      },

      getExceptionAt: (index: number) => {
        return getException(this.reportsList[index])
      },

      findReport: (e: Error) => {
        return this.reportsList.find((r) => {
          const err = getException(r)
          return err && err.name === e.name && err.message === e.message
        })
      },

      isExist(e: Error) {
        return this.findReport(e) !== undefined
      },
    }
  }

  private createPuppeteerHandler = (baseUrl: string): Handler<HTTPRequest> => (
    request
  ) => {
    if (!request) {
      return
    }

    const url = request?.url()
    if (!url || !url.startsWith(baseUrl)) {
      return
    }
    const path = url.substring(baseUrl.length)

    if (/\/api\/[0-9]*\/store/.test(path)) {
      const requestPostData = request.postData()

      if (!requestPostData) {
        return
      }

      this.reportsList.push(transformReport(JSON.parse(requestPostData)))
    }
  }

  private createLocalServerApi = () => {
    let runningServer: http.Server | null = null
    let localDsn: string | null = null

    const start = (userDsn: string) => {
      if (runningServer !== null) {
        throw new Error('Local server is already running')
      }

      const { project } = parseDsn(userDsn)
      const app = express()
      app.use(bodyParser.json())
      app.post(`/api/${project}/store/`, (req, res) => {
        this.reportsList.push(transformReport(req.body))
        res.sendStatus(200)
      })
      runningServer = http.createServer(app)

      return new Promise<void>((resolve) => {
        runningServer?.listen(() => {
          const port = (runningServer?.address()! as AddressInfo).port
          localDsn = `http://acacaeaccacacacabcaacdacdacadaca@localhost:${port}/${project}`
          resolve()
        })
      })
    }

    const stop = () => {
      if (runningServer === null) {
        throw new Error('Local server is not running')
      }

      return new Promise<void>((resolve, reject) => {
        runningServer?.close((error) => (error ? reject(error) : resolve()))
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
}

export default () => new SentryTestkit()
