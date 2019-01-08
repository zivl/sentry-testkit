'use strict';

function getException(report) {
  return report.exception.values[0];
}

module.exports = () => {
  let reports = [];
  return {
    sentryTransport: function(options) {
      return {
        // captureEvent(event: SentryEvent): Promise<SentryResponse>;
        captureEvent: function(report) {
          reports.push(report);
          return Promise.resolve({
            status: 'success',
            event: report
          });
        }
      };
    },
    testkit: {
      reports() {
        return reports;
      },

      reset() {
        reports = [];
      },

      extractException(report) {
        return getException(report);
      },

      getExceptionAt(index) {
        return getException(reports[index]);
      },

      findReport(e) {
        return reports.find(r => {
          const err = getException(r);
          return err.type === e.name && err.value === e.message;
        });
      },

      isExist(e) {
        return this.findReport(e) !== undefined;
      }
    }
  };
};
