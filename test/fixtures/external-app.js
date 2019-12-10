const Sentry = require('@sentry/node')

const dsn = process.argv[2]
const errorMessage = process.argv[3]
Sentry.init({ dsn })
Sentry.captureException(new Error(errorMessage))
