---
title: Browser Only
description: Browser only support for sentry-testkit
sidebar_position: 5
---

# Running in Browser Only Mode

`Sentry-testkit` is a JavaScript library commonly used with the Sentry error monitoring and reporting platform. It offers the ability to simulate and test Sentry error reporting. A noteworthy aspect of `sentry-testkit` is its compatibility with different JavaScript environments, including both Node.js and web browsers. This compatibility is achieved through the following mechanisms:

## Node.js Dependencies

`Sentry-testkit` relies on two Node.js packages, namely `express` and `http`. These packages are typically used in Node.js applications for tasks such as handling HTTP requests and creating web servers. This dependency implies that `sentry-testkit` was originally designed with Node.js environments in mind, where server-side JavaScript operations are common.

## Separated Browser-Only Entry Point

To make `sentry-testkit` suitable for use in web browsers (client-side JavaScript), a separate entry point called `sentry-testkit/browser` has been introduced. This browser-specific entry point is configured to exclude any code that depends on Node.js-specific features or APIs.

This separation ensures that when using `sentry-testkit` in a browser context, you won't encounter issues related to Node.js-specific code that wouldn't work in browsers. Instead, you can rely on the `sentry-testkit/browser` version to provide compatibility with browser-based JavaScript applications.

In summary, `sentry-testkit` offers versatility by supporting both Node.js and browser environments. The introduction of `sentry-testkit/browser` allows developers to seamlessly use this library for testing Sentry error reporting in a variety of JavaScript environments.

### Usage
```javascript
import sentryTestkit from 'sentry-testkit/browser';

const { sentryTransport, testkit } = sentryTestkit();

// initialize your Sentry instance with sentryTransport

// ...the rest of the testkit usage is the same as in the Node.js example

```
