<div style="text-align: center;">
    <img alt="sentry-teskit" src="./logo/Sentry_github.svg" style="height: 140px;">
</div>
<div style="text-align: center;">
    <img alt="sentry-teskit-npm" src="https://img.shields.io/npm/v/sentry-testkit.svg">
    <img alt="sentry-teskit-downloads" src="https://img.shields.io/npm/dm/sentry-testkit.svg">
    <img alt="sentry-teskit-tests" src="https://github.com/zivl/sentry-testkit/workflows/Test/badge.svg">
    <img alt="sentry-teskit-v6" src="https://img.shields.io/badge/Compatible%20with%20Sentry-v6-blue">
    <img alt="sentry-teskit-v7" src="https://img.shields.io/badge/Compatible%20with%20Sentry-v7-blue">
</div>



Sentry is an open-source JavaScript SDK published by [Sentry](https://sentry.io/welcome/) to enable error tracking that helps developers monitor and fix crashes in real time.<br>
However, when building tests for your application, you want to assert that the right flow-tracking or error is being sent to *Sentry*, **but** without really sending it to *Sentry* servers. This way you won't swamp Sentry with false reports during test running and other CI operations.

# Sentry Testkit - to the rescue!
*Sentry Testkit* enables Sentry to work natively in your application, and by overriding the default Sentry transport mechanism, the report is not really sent but rather logged locally into memory. In this way, the logged reports can be fetched later for your own usage, verification, or any other use you may have in your local developing/testing environment.

> [!NOTE]
> This documentation is for the latest version of `sentry-testkit`. For v2, please visit [here](https://github.com/zivl/sentry-testkit/tree/v2.x/docs/api)
