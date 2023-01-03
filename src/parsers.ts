import { transformReport, transformTransaction } from './transformers'
import { Testkit } from './types'

const dsnKeys = 'source protocol user pass host port path'.split(' ')
const dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/ //eslint-disable-line no-useless-escape

export function parseDsn(dsn: string) {
  const dsnMatch = dsn.match(dsnPattern)
  if (!dsnMatch) {
    throw new Error('Could not parse DSN')
  }
  const { protocol, host, path } = dsnMatch.reduce<{
    protocol: string
    host: string
    path: string
  }>(
    (parsed, current, index) =>
      Object.assign({}, parsed, {
        [dsnKeys[index] as string]: current,
      }),
    {} as { protocol: string; host: string; path: string }
  )

  const project = path.substr(path.lastIndexOf('/') + 1)

  return { protocol, project, host }
}

export function parseEnvelopeRequest(reqBody: string) {
  const [_header, itemHeader, itemPayload] = reqBody.split('\n')
  return {
    type: JSON.parse(itemHeader!).type,
    payload: JSON.parse(itemPayload!),
  }
}

export function handleEnvelopeRequestData(
  requestBody: any,
  testkit: Testkit
): void {
  const { type, payload } = parseEnvelopeRequest(requestBody)

  if (type === 'transaction') {
    testkit.transactions().push(transformTransaction(payload))
  } else if (type === 'event') {
    testkit.reports().push(transformReport(payload))
  }
}
