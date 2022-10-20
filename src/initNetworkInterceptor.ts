import { parseDsn, parseEnvelopeRequest } from './parsers'
import { transformReport, transformTransaction } from './transformers'
import { Testkit } from './types'

export type InterceptorCallback = (
  url: string,
  requestBodyHandler: (body: any) => number,
  envelopBodyHandler: (body: any) => void
) => any

export function createInitNetworkInterceptor(testkit: Testkit) {
  return (dsn: string, cb: InterceptorCallback) => {
    const { protocol, host } = parseDsn(dsn)
    const baseUrl = `${protocol}://${host}`
    const handleRequestBody = (requestBody: any) =>
      testkit.reports().push(transformReport(requestBody))
    const handleEnvelopeRequestBody = (requestBody: any) => {
      const { type, payload } = parseEnvelopeRequest(requestBody)

      if (type === 'transaction') {
        testkit.transactions().push(transformTransaction(payload))
      }

      if (type === 'event') {
        testkit.reports().push(transformReport(payload))
      }
    }

    return cb(baseUrl, handleRequestBody, handleEnvelopeRequestBody)
  }
}
