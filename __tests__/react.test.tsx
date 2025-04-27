/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import * as Sentry from '@sentry/react'
import sentryTestkit from '../src'

const { testkit, sentryTransport } = sentryTestkit()

const ThrowError = () => {
  // eslint-disable-next-line
  throw Error('test error')
}

describe('Inside ErrorBoundary', () => {
  const consoleError = console.error
  beforeAll(() => {
    console.error = jest.fn()
    Sentry.init({
      dsn: 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001',
      transport: sentryTransport,
    })
  })
  afterAll(() => {
    console.error = consoleError
  })

  test('should render Fallback component and captureException when error is thrown', async () => {
    expect(testkit.reports()).toHaveLength(0)
    render(
      <Sentry.ErrorBoundary fallback={<div>some error</div>}>
        <ThrowError />
      </Sentry.ErrorBoundary>
    )

    expect(testkit.reports()).toHaveLength(1)
    expect(testkit.reports()[0].error?.message).toEqual('test error')
  })
})
