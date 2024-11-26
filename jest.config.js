const config = {
  verbose: true,
  setupFilesAfterEnv: [require.resolve('regenerator-runtime/runtime')],
  testMatch: ['**/packages/annapoorani/src/**/tests/unit/*.[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/.annapoorani/',
    '<rootDir>/node_modules/',
    '<rootDir>/packages/core/node_modules/'
  ]
}

module.exports = config;
