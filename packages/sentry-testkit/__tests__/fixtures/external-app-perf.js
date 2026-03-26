const Sentry = require('@sentry/node')

const dsn = process.argv[2]
Sentry.init({
  dsn,
  tracesSampleRate: 1,
  integrations: Sentry.defaultIntegrations,
  transport: Sentry.makeNodeTransport,
  stackParser: Sentry.defaultStackParser,
})
// TODO(sentry): Use `startInactiveSpan()` instead - see https://github.com/getsentry/sentry-javascript/blob/develop/docs/v8-new-performance-apis.md
const transaction = Sentry.startInactiveSpan({
  op: 'transaction',
  name: 'transaction-name',
})
const childSpan = transaction.startChild({
  op: 'child-span',
  description: 'child-description',
})
childSpan.finish()
transaction.finish()
