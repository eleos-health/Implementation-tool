module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    jquery: true,
    webextensions: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    camelcase: 0,
    'consistent-return': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-console': 0,
    'no-cycle': 0,
    'no-empty': 0,
    'no-return-assign': 0,
    'no-sequences': 0,
    'no-param-reassign': 0,
    'import/no-cycle': 0,
    'no-promise-executor-return': 0,
    'prefer-regex-literals': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-irregular-whitespace': 0,
    'no-unused-expressions': 0,
    'class-methods-use-this': 0,
    'no-new': 0,
    'prefer-destructuring': 0,
    'max-len': ['error', { code: 1000 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['error', 2],
    'no-multi-spaces': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
