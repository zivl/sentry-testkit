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
        reports: () => reports,
        reset: () => reports = [],
        extractException: report => getException(report),
        getExceptionAt: index => getException(reports[index]),
        findReport: e => reports.find(r => {
            const err = getException(r)
            return err.type === e.name && err.value === e.message
        })
    }
}
