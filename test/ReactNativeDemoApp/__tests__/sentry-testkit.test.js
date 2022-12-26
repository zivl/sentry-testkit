import sentryTestkit from 'sentry-testkit';
import * as Sentry from '@sentry/react-native';
import waitForExpect from 'wait-for-expect';

const {testkit, sentryTransport} = sentryTestkit();
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001';
// initialize your Sentry instance with sentryTransport
Sentry.init({
  dsn: DUMMY_DSN,
  transport: sentryTransport,
  //... other configurations
});

test('collect error events', async function () {
  Sentry.captureException(new Error('This is a test'));
  await waitForExpect(() => expect(testkit.reports()).toHaveLength(1));
  const report = testkit.reports()[0];
  expect(report.error.message).toEqual('This is a test');
});
