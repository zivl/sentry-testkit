
const {expect} = require('chai')
const Raven = require('raven-js')
const testKitInitializer = require('../dist/index.js')

const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'

describe('raven test-kit test suite', function() {
    
    before(function() {
        Raven.config(DUMMY_DSN, {release: 'test'})
    })

    it('should be properly initialized with empty reports', function() {
        const testKit = testKitInitializer(Raven)
        expect(testKit).to.exist
        expect(testKit.reports()).to.be.empty
    })

    it('should report to test kit instead of sending http request', function() {
        const testKit = testKitInitializer(Raven)
        Raven.captureException(new Error('raven test kit is awesome!'), {extra: {os: 'mac-os'}})
        expect(testKit.reports()).to.have.lengthOf(1)
        const report = testKit.reports()[0]
        expect(report).to.have.property('release').to.equal('test')
        expect(report).to.have.property('extra').to.have.property('os').to.equal('mac-os')
        expect(report).to.have.property('exception').to.satisfy(exception => {
            const errorDetails = exception.values[0]
            return errorDetails.type === 'Error' && errorDetails.value === 'raven test kit is awesome!'
        })
    })

    it('should reset and empty the reports log', function() {
        const testKit = testKitInitializer(Raven)
        Raven.captureException(new Error('raven test kit is awesome!'))
        expect(testKit.reports()).to.have.lengthOf(1)
        testKit.reset()
        expect(testKit.reports()).to.be.empty
    })

    it('should act according to a given \'shouldSendCallback\' ', function() {
        let shouldIt = Math.random() * 100 <= 50
        const shouldSendCallback = data => shouldIt
        const testKit = testKitInitializer(Raven, shouldSendCallback)
        Raven.captureException(new Error('raven test kit is awesome!'))
        shouldIt ?
            expect(testKit.reports()).to.have.lengthOf(1)
            : expect(testKit.reports()).to.have.lengthOf(0) 
        
    })
})