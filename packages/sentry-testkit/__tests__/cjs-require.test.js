const sentryTestkit = require('../dist/index')

describe('commonjs require', () => {
  it('should allow to require both default and non-default exports', () => {
    expect(sentryTestkit()).toBeDefined()
    expect(sentryTestkit.default()).toBeDefined()
  })
})
