jest.mock('@sentry/browser', () => {
  const sentryTestkit = jest.requireActual('./index')
  const { testkit, sentryTransport } = sentryTestkit()
  const Sentry = jest.requireActual('@sentry/browser')
  // @ts-expect-error
  global.testkit = testkit
  return Object.assign({}, Sentry, {
    __esModule: true,
    init: (options: any) =>
      Sentry.init(Object.assign({}, options, { transport: sentryTransport })),
  })
})
