const config = {
  verbose: true,
  setupFilesAfterEnv: [require.resolve('regenerator-runtime/runtime')],
  testMatch: ['**/packages/customer01annapooranisarees/src/**/tests/unit/*.[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/.customer01annapooranisarees/',
    '<rootDir>/node_modules/',
    '<rootDir>/packages/core/node_modules/'
  ]
}

module.exports = config;
