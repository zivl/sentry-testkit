'use strict'

const dsnKeys = 'source protocol user pass host port path'.split(' ')
const dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/ //eslint-disable-line no-useless-escape

const parseDsn = dsn => {
  const { protocol, host, path } = dsn.match(dsnPattern).reduce(
    (parsed, current, index) =>
      Object.assign({}, parsed, {
        [dsnKeys[index]]: current,
      }),
    {}
  )

  const project = path.substr(path.lastIndexOf('/') + 1)

  return { protocol, project, host }
}

const parseEnvelopeRequest = reqBody => {
  const [_header, itemHeader, itemPayload] = reqBody.split('\n')
  return {
    type: JSON.parse(itemHeader).type,
    payload: JSON.parse(itemPayload),
  }
}

module.exports.parseDsn = parseDsn
module.exports.parseEnvelopeRequest = parseEnvelopeRequest
