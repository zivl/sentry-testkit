import { createTestkit } from './testkit'
import { createLocalServerApi } from './localServerApi'
import { createInitNetworkInterceptor } from './initNetworkInterceptor'
import { createSentryTransport } from './sentryTransport'

export = () => {
  const testkit = createTestkit()
  const sentryTransport = createSentryTransport(testkit)
  const initNetworkInterceptor = createInitNetworkInterceptor(testkit)
  const localServer = createLocalServerApi(testkit)

  return {
    sentryTransport,
    testkit,
    initNetworkInterceptor,
    localServer,
  }
}
