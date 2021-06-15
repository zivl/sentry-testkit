const Sentry = require('@sentry/node')

const dsn = process.argv[2]
Sentry.init({ dsn, tracesSampleRate: 1 })
const transaction = Sentry.startTransaction({
  op: 'transaction',
  name: 'transaction-name',
})
transaction
  .startChild({ op: 'child-span', description: 'child-description' })
  .finish()
transaction.finish()
