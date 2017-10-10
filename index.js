'use strict'

module.exports = (Raven) => {
    let reports = []

    Raven.setTransport(({data, onSuccess /*, url, auth, onError*/}) => {
        reports.push(data)
        if (onSuccess) {
            onSuccess()
        }
    })

    Raven.setShouldSendCallback(() => true)

    return {
        reports: () => reports,
        reset: () => reports = []
    }
}
