/**
 * @param {*} wallaby
 * */
 module.exports = function (wallaby) {
  return {
    files: ['index.ts'],
    tests: ['test/**/*.test.ts'],
    env: {
      type: 'node',
    },
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'React',
      }),
    },
    testFramework: 'jest',
  }
}
