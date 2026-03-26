---
title: External Process
description: How to use external process error reports interception with Sentry Testkit
sidebar_position: 4
---

# External Process
Sentry Testkit supports intercepting reports from an external process, by running a fake local Sentry server.
This is useful for testing CLI tools for example, where the test is running the CLI as a child process and asserting the output.

Once you start the local server, it generates an alternative DSN that redirects to the local server instead of Sentry's real servers. You need to pass this DSN to your app.

## Local Server API
Sentry Testkit exports a `localServer` instance with the following functions listed below.

### `start (dsn: string) => Promise<void>`
Starts the local server with your app DSN. The promise resolves once the server is ready.

### `stop: () => Promise<void>`
Stops the local server. The promise resolves once the server is fully stopped.

### `getDsn: () => string`
Returns the alternative DSN. Can be used only when the server is running.


## Example
In the example below, we pass it as an argument, although in real apps it may be passed using an environment variable or other creative ways.
```javascript

const execa = require('execa')
const waitForExpect = require('wait-for-expect')
const sentryTestkit = require('sentry-testkit')

const { testkit, localServer } = sentryTestkit()
const MY_APP_DSN = 'http://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('my app - error reporting', function() {
  beforeAll(() => localServer.start(MY_APP_DSN))

  afterAll(() => localServer.stop())

  beforeEach(() => testkit.reset())

  test('should report to test kit from an external process', async function() {
    const dsn = localServer.getDsn()
    const errorMessage = 'sentry test kit is awesome!'
    execa
      .node('my-app.js', [
        dsn,
        errorMessage,
      ])
      .stdout.pipe(process.stdout)

    await waitForExpect(() => {
      expect(testkit.reports()[0].error).toMatchObject({
        name: 'Error',
        message: errorMessage,
      })
    })
  })
})
```
