const dsnKeys = 'source protocol user pass host port path'.split(' ')
const dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/ //eslint-disable-line no-useless-escape

export const parseDsn = (dsn: string) => {
  const dsnMatch = dsn.match(dsnPattern)
  if (!dsnMatch) {
    throw new Error('Could not parse DSN')
  }
  const { protocol, host, path } = dsnMatch.reduce(
    (parsed, current, index) =>
      Object.assign({}, parsed, {
        [dsnKeys[index] as string]: current,
      }),
    {} as {
      path: string
      host: string
      protocol: string
    }
  )

  const project = path.substr(path.lastIndexOf('/') + 1)

  return { protocol, project, host }
}
