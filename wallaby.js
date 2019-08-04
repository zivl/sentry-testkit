module.exports = function() {
  return {
    files: ['index.js'],

    tests: ['test/**/*.test.js'],

    env: {
      type: 'node',
    },
    testFramework: 'jest',
  };
};
