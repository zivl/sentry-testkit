'use strict'

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
        reset: () => reports = []
    }
}
