import * as Sentry from '@sentry/node'
import nock from 'nock'
import sentryTestkit from '../src'
import { createCommonTests } from './commonTests'

const { testkit, initNetworkInterceptor } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'
describe('sentry test-kit test suite - network interception', function () {
  beforeAll(() => {
    nock.cleanAll()
    nock.disableNetConnect()

    initNetworkInterceptor(
      DUMMY_DSN,
      (
        baseUrl: string,
        handleRequestBody: (requestBody: unknown) => void,
        handlePerfRequestBody: (requestBody: unknown) => void
      ) => {
        nock(baseUrl)
          .persist()
          .post(/\/api\/000001\/store/)
          .reply(200, (_, requestBody: unknown) => {
            handleRequestBody(requestBody)
          })
          .post(/\/api\/000001\/envelope/)
          .reply(200)
          // use the request event since in a reply function (like above)
          // nock automatically tries to parse the body as json, and fails
          // since Sentry are using a non-standard json with a json request header
          .on('request', (_, interceptor, body: unknown) => {
            if (interceptor.uri.test('/api/000001/envelope')) {
              handlePerfRequestBody(body)
            }
          })
      }
    )

    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      tracesSampleRate: 1,
      beforeSend(event) {
        event.extra = { os: 'mac-os' }
        return event
      },
    })
  })

  beforeEach(() => testkit.reset())

  createCommonTests({ Sentry, testkit })
})
