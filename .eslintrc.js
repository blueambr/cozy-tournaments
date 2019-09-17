module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'camelcase': 0,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'indent': ['error', 2],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-underscore-dangle': 0,
    'quotes': ['error', 'single'],

    /* 'expression' or 'declaration'
    Choose your own or delete to disable */
    'func-style': ['error', 'expression']
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
