import { parseEnvelope } from './parsers'
import {
  transformLog,
  transformReport,
  transformTransaction,
} from './transformers'
import { Log, Report, ReportError, Testkit, Transaction } from './types'

function getException(report: Report) {
  return report.error
}

function matches(value: string | undefined, matcher: string | RegExp) {
  return typeof matcher === 'string'
    ? value === matcher
    : value !== undefined && matcher.test(value)
}

function waitFor<T>(
  kind: string,
  getItems: () => T[],
  count: number,
  { timeout = 1000 }: { timeout?: number } = {}
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now()
    const check = () => {
      const items = getItems()
      if (items.length >= count) {
        resolve(items)
      } else if (Date.now() - startedAt >= timeout) {
        reject(
          new Error(
            `Expected at least ${count} ${kind} within ${timeout}ms, but only ${items.length} were captured`
          )
        )
      } else {
        setTimeout(check, 10)
      }
    }
    check()
  })
}

export function createTestkit(): Testkit {
  let reports: Report[] = []
  let transactions: Transaction[] = []
  let logs: Log[] = []

  const createRequestHandler = (baseUrl: string) => (request: any) => {
    const url = request.url()
    if (!url.startsWith(baseUrl)) {
      return
    }
    const path = url.substring(baseUrl.length)
    if (/\/api\/[0-9]*\/store/.test(path)) {
      reports.push(transformReport(JSON.parse(request.postData())))
    }
    if (/\/api\/[0-9]*\/envelope/.test(path)) {
      parseEnvelope(request.postData()).forEach(({ header, payload }) => {
        if (header.type === 'transaction') {
          transactions.push(transformTransaction(payload))
        } else if (header.type === 'event') {
          reports.push(transformReport(payload))
        } else if (header.type === 'log') {
          const items = (payload && payload.items) || []
          items.forEach((log: any) => logs.push(transformLog(log)))
        }
      })
    }
  }

  // Puppeteer and Playwright expose the same request surface:
  // page.on/off('request') with request.url() and request.postData()
  const createPageListener = () => {
    let handler: any = null
    return {
      startListening: (page: any, baseUrl: string = 'https://sentry.io') => {
        handler = createRequestHandler(baseUrl)
        page.on('request', handler)
      },

      stopListening: (page: any) => {
        page.off('request', handler)
      },
    }
  }

  return {
    puppeteer: createPageListener(),
    playwright: createPageListener(),

    reports() {
      return reports
    },

    transactions() {
      return transactions
    },

    logs() {
      return logs
    },

    waitForReports(count, options) {
      return waitFor('reports', () => reports, count, options)
    },

    waitForTransactions(count, options) {
      return waitFor('transactions', () => transactions, count, options)
    },

    waitForLogs(count, options) {
      return waitFor('logs', () => logs, count, options)
    },

    reset() {
      reports = []
      transactions = []
      logs = []
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

    findReportByMessage(message: string | RegExp) {
      return reports.find(
        r => matches(r.message, message) || matches(r.error?.message, message)
      )
    },

    findTransaction(name: string | RegExp) {
      return transactions.find(t => matches(t.name, name))
    },

    reportsWithTag(key: string, value?: string) {
      return reports.filter(
        r => key in r.tags && (value === undefined || r.tags[key] === value)
      )
    },

    transactionsWithTag(key: string, value?: any) {
      return transactions.filter(
        t => key in t.tags && (value === undefined || t.tags[key] === value)
      )
    },

    isExist(e: ReportError) {
      return this.findReport(e) !== undefined
    },
  }
}
