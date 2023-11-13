const Sentry = require('@sentry/node')

require('@sentry/tracing')

const dsn = process.argv[2]
Sentry.init({
  dsn,
  tracesSampleRate: 1,
  integrations: Sentry.defaultIntegrations,
  transport: Sentry.makeNodeTransport,
  stackParser: Sentry.defaultStackParser,
})
const transaction = Sentry.startTransaction({
  op: 'transaction',
  name: 'transaction-name',
})
transaction
  .startChild({ op: 'child-span', description: 'child-description' })
  .finish()
transaction.finish()
