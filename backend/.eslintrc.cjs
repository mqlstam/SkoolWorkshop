module.exports = {
  env: {
    browser: false,
    es2021: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 4],
    'no-unused-expressions': 'off'
  }
}
