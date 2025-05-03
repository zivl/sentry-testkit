import { parseEnvelopeRequest } from './parsers'
import { transformReport, transformTransaction } from './transformers'
import { Report, ReportError, Testkit, Transaction } from './types'

function getException(report: Report) {
  return report.error
}

export function createTestkit(): Testkit {
  let reports: Report[] = []
  let transactions: Transaction[] = []

  let puppeteerHandler: any = null
  const createPuppeteerHandler = (baseUrl: string) => (request: any) => {
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
      } else if (type === 'event') {
        reports.push(transformReport(payload))
      }
    }
  }

  return {
    puppeteer: {
      startListening: (page: any, baseUrl: string = 'https://sentry.io') => {
        puppeteerHandler = createPuppeteerHandler(baseUrl)
        page.on('request', puppeteerHandler)
      },

      stopListening: (page: any) => {
        page.off('request', puppeteerHandler)
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

    getExceptionAt(index: number) {
      if (reports[index]) {
        return getException(reports[index]!)
      } else {
        throw new Error(`There's not report at index ${index}`)
      }
    },

    findReport(e: ReportError) {
      return reports.find(r => {
        const err = getException(r)
        return err && err.name === e.name && err.message === e.message
      })
    },

    isExist(e: ReportError) {
      return this.findReport(e) !== undefined
    },
  }
}
