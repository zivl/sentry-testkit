import { handleEnvelopeRequestData, parseDsn } from './parsers'
import { transformReport } from './transformers'
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
      handleEnvelopeRequestData(requestBody, testkit)
    }

    return cb(baseUrl, handleRequestBody, handleEnvelopeRequestBody)
  }
}
