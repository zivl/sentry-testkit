const Sentry = require('@sentry/node')

const dsn = process.argv[2]
const errorMessage = process.argv[3]
Sentry.init({
  dsn,
  integrations: Sentry.defaultIntegrations,
  transport: Sentry.makeNodeTransport,
  stackParser: Sentry.defaultStackParser,
})
Sentry.captureException(new Error(errorMessage))
