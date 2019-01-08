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
      /**
       * @function reports
       * @description
       * Get all existing reports.
       *
       * @instance
       * @returns {Array} where each member of the array consists of `Raven`'s *data* object.
       * @see You may refer to the [Sentry Docs](https://docs.sentry.io/clients/) for further explanation and details.
       */
      reports() {
        return reports;
      },

      /**
       * @function reset
       * @description
       * Reset the teskit state and clear all existing reports.
       *
       * @instance
       * @returns {Array} empty array.
       */
      reset() {
        reports = [];
      },

      /**
       * @function extractException
       * @description
       * Extract the exception object of a given report.
       *
       * @instance
       * @param {Object} report the report object.
       * @returns {Object} the exception object as built by `Raven`
       */
      extractException(report) {
        return getException(report);
      },

      /**
       * @function getExceptionAt
       * @description
       * Extract the exception object of a report in a specific position.
       *
       * @instance
       * @param {number} index the index position of the report
       * @returns {Object} the exception object as built by `Raven`
       */
      getExceptionAt(index) {
        return getException(reports[index]);
      },

      /**
       * @function findReport
       * @description
       * Find a report by a given error.
       *
       * @instance
       * @param {Error} error the error to look for in the reports
       * @returns {Object | undefined} the report object if one found. `undefined` otherwise
       * @see Uses [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
       */
      findReport(e) {
        return reports.find(r => {
          const err = getException(r);
          return err.type === e.name && err.value === e.message;
        });
      },

      /**
       * @function isExist
       * @description
       * check whether a given error exist (i.e. has been reported)
       *
       * @instance
       * @param {Error} error the error to look for in the reports
       * @returns {Boolean} `true` if the error exists. `false` otherwise
       */
      isExist(e) {
        return this.findReport(e) !== undefined;
      }
    }
  };
};
