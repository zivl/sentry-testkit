'use strict'

const getException = report => report.exception.values[0]

module.exports = (Raven, callback = () => true) => {
  let reports = []

  Raven.setTransport(({data, onSuccess /*, url, auth, onError*/}) => {
    reports.push(data)
    if (onSuccess) {
      onSuccess()
    }
  })

  Raven.setShouldSendCallback(callback)

  return {
    /**
     * @function reports
     * @description
     * Get all existing reports.
     *
     * @instance
     * @returns {Array} where each member of the array consists of `Raven`'s *data* object.
     * @see You may refer to the [Sentry Docs](https://docs.sentry.io/clients/) for further explanation and details.
     */
    reports: () => reports,

    /**
     * @function reset
     * @description
     * Reset the teskit state and clear all existing reports.
     *
     * @instance
     * @returns {Array} empty array.
     */
    reset: () => reports = [],

    /**
     * @function extractException
     * @description
     * Extract the exception object of a given report.
     *
     * @instance
     * @param {Object} report the report object.
     * @returns {Object} the exception object as built by `Raven`
     */
    extractException: report => getException(report),

    /**
     * @function getExceptionAt
     * @description
     * Extract the exception object of a report in a specific position.
     *
     * @instance
     * @param {number} index the index position of the report
     * @returns {Object} the exception object as built by `Raven`
     */
    getExceptionAt: index => getException(reports[index]),

    /**
     * @function findReport
     * @description
     * Find a report by a given error.
     *
     * @instance
     * @param {Error} error the error to look for in the reports
     * @returns {Object | undefind} the report object if one found. `undefined` otherwise
     * @see Uses [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     */
    findReport: e =>
      reports.find(r => {
        const err = getException(r)
        return err.type === e.name && err.value === e.message
      }),

    isExist: e => findReport(e) !== undefined
  }
}
