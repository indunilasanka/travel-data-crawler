module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
  },
  globals: {
    jest: false,
    expect: false,
    describe: false,
    test: false,
    beforeAll: false,
    beforeEach: false,
    afterAll: false,
    afterEach: false,
  },
};
