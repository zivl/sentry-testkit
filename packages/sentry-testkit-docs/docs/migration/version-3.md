# Version 3 Migration Guide

## Breaking Changes

* The report object has changed from Sentry's report to our own format.
Please visit [`Report`](../api/types#report) to see the available keys on the new object.
In case you need to access a key we don't expose, you can use [`report.originalReport`](../api/types#report).
* `testkit.extractException` was removed. You can use `report.error` instead.
* `testkit.findReport` now returns [`Report`](../api/types#report)
* `testkit.getExceptionAt` now returns [`ReportError`](../api/types#reporterror)
