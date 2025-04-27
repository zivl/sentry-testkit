# Version 6 Migration Guide

`sentry-testkit` version 6 is a major release that introduces a few breaking changes. This guide will help you to migrate your existing codebase to the new version.

## Added Features

### Node.js 18, 20, 22 versions support

Starting from version 6, `sentry-testkit` will only support Node.js version 18 and above. If you are using an older version of Node.js, you will need to upgrade to a newer version.

### Sentry SDKs for JavaScript packages at versions 8 and 9 support

Starting from version 6, `sentry-testkit` will only support Sentry SDKs for JavaScript packages at versions 8 and above. If you are using an older version of Sentry SDKs for JavaScript, you will need to upgrade to a newer version.
The following Sentry SDKs for JavaScript packages are supported:

- `@sentry/browser`
- `@sentry/node`
- `@sentry/react`
- `@sentry/react-native`
- `@sentry/types`

### spanId and parentSpanId support

Version 6.1.0 introduces support for `spanId` and `parentSpanId` properties in your Sentry reports. These IDs are essential for performance monitoring and distributed tracing, allowing you to track the relationships between various spans and transactions in your application.

For more detailed information and usage examples, see the [Span IDs documentation](/docs/span-ids).

### Sentry-Testkit Documentation

The documentation for `sentry-testkit` is built using `docusaurus` and hosted on GitHub pages. In version 6, we have upgraded `docusaurus` engine to the latest version and improved the documentation.

## Breaking Changes

### Dropped Node.js 14 and 16 support

Starting from version 6, `sentry-testkit` will no longer support Node.js versions 14 and 16. If you are using an older version of Node.js, you will need to upgrade to a newer version.

## Docs: Types page has been removed

As of version 6, we have removed the `Types` page from the documentation. We have decided to remove it because it was not providing any value to the users, specifically after we have moved to TypeScript in `sentry-testkit@5`.
