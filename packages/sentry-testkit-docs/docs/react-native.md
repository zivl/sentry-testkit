---
title: React Native Testing
description: How to use sentry-testkit with React Native applications
sidebar_position: 5
---

# React Native Testing

## Overview

Starting from version 6, sentry-testkit provides built-in support for testing React Native applications that use Sentry for error tracking and monitoring. This allows you to verify that your React Native app correctly reports errors and events to Sentry without actually sending them to Sentry's servers during testing.

## Setup

To use sentry-testkit with React Native, you need to follow these steps:

1. Install sentry-testkit in your React Native project:

```bash
npm install --save-dev sentry-testkit
# or
yarn add --dev sentry-testkit
```

2. Import and initialize sentry-testkit in your tests:

```javascript
import * as ReactNativeSentry from '@sentry/react-native'
import sentryTestkit from 'sentry-testkit'

const { testkit, sentryTransport } = sentryTestkit()
```

3. Initialize Sentry with the testkit transport:

```javascript
ReactNativeSentry.init({
  dsn: 'https://your-dummy-dsn@sentry.io/123456',
  release: 'test',
  tracesSampleRate: 1,
  transport: sentryTransport,
  // other configurations
})
```

## Example

Here's a complete example showing how to test a React Native application with sentry-testkit:

```javascript
import { Event, ErrorEvent } from '@sentry/core';
import * as ReactNativeSentry from '@sentry/react-native';
import sentryTestkit from 'sentry-testkit';

const { testkit, sentryTransport } = sentryTestkit();
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001';
const Sentry = ReactNativeSentry;

describe('React Native Sentry integration tests', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      tracesSampleRate: 1,
      transport: sentryTransport,
      beforeSend(event: Event) {
        event.extra = { os: 'mobile-device' };
        return event as ErrorEvent;
      },
    })
  );

  beforeEach(() => testkit.reset());

  test('should capture React Native exceptions', async () => {
    Sentry.captureException(new Error('React Native test error'));

    // Use a mechanism like waitForExpect to allow async operations to complete
    expect(testkit.reports()).toHaveLength(1);

    const report = testkit.reports()[0];
    expect(report.error).toMatchObject({
      name: 'Error',
      message: 'React Native test error',
    });
  });

  test('should include platform-specific information', async () => {
    Sentry.captureException(new Error('Platform-specific error'));

    expect(testkit.reports()).toHaveLength(1);
    expect(testkit.reports()[0].extra).toEqual({ os: 'mobile-device' });
  });
});
```

## Expo Support

sentry-testkit works seamlessly with Expo-based React Native applications. The configuration is the same as regular React Native apps.

## Common React Native Scenarios

### Testing Native Crashes

While JavaScript errors are captured automatically, native crashes (like those in native modules) require specific handling. Make sure you're properly configuring Sentry's native SDKs.

### Testing Navigation Errors

When testing navigation-related errors in React Native, ensure your navigation setup is properly mocked in the test environment.

### Testing Network Errors

For testing how your React Native app handles network errors with Sentry:

```javascript
test('should report network errors', async () => {
  // Simulate a network error
  const networkError = new Error('Network request failed')
  networkError.name = 'NetworkError'

  Sentry.captureException(networkError)

  expect(testkit.reports()).toHaveLength(1)
  expect(testkit.reports()[0].error.name).toBe('NetworkError')
})
```

## Notes on React Native Environment

When testing React Native applications with sentry-testkit, keep in mind:

1. React Native's environment differs from browser or Node.js environments
2. Some Sentry features may behave differently in React Native
3. It's best to reset the testkit between tests using `testkit.reset()`

For more advanced React Native testing scenarios or platform-specific issues, refer to the [Sentry React Native documentation](https://docs.sentry.io/platforms/react-native/).
