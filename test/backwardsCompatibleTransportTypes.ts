// This file is deliberately not named .test.ts as we don't want Jest to run it, we just want tsc to type check it

import * as V7SentryTypes from '@sentry/types'
import * as V4SentryTypes from '@sentry4/types'
import * as V5SentryTypes from '@sentry5/types'
import * as V6SentryTypes from '@sentry6/types'
import sentryTestkit from '../src'

const { sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

test('v7 transport', () => {
  const transportCreator: Required<
    V7SentryTypes.Options
  >['transport'] = sentryTransport
  let transport = transportCreator({
    url: DUMMY_DSN,
    recordDroppedEvent: jest.fn(),
  })
  transport.send([{ sent_at: 'sometime' }, []])
  transport.flush(1)
})

test('v6 transport', () => {
  const TransportCreator: Required<
    V6SentryTypes.Options
  >['transport'] = sentryTransport
  let transport = new TransportCreator({ dsn: DUMMY_DSN })
  transport.sendEvent({})
  transport.sendSession!({ aggregates: [] })
  transport.recordLostEvent!('event_processor', 'event')
  transport.close(1)
})

test('v5 transport', () => {
  const TransportCreator: Required<
    V5SentryTypes.Options
  >['transport'] = sentryTransport
  let transport = new TransportCreator({ dsn: DUMMY_DSN })
  transport.sendEvent({})
  transport.sendSession!({
    update: jest.fn(),
    close: jest.fn(),
    toJSON: jest.fn(),
  })
  transport.close(1)
})

test('v4 transport', () => {
  const TransportCreator: V4SentryTypes.TransportClass<V4SentryTypes.Transport> = sentryTransport
  let transport = new TransportCreator({ dsn: DUMMY_DSN })
  transport.sendEvent('body')
  transport.captureEvent!({})
  transport.close(1)
})
