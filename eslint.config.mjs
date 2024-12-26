import basis from 'basis/libraries/eslint-plugin/dist/index.js'

export default [
  ...basis,
  {
    files: ['*.mjs'],
    rules: {
      '@import/extensions': 'off',
      '@import/no-default-export': 'off',
    },
  },
  {
    files: ['**/vite.config.*'],
    rules: {
      '@import/no-default-export': 'off',
    },
  },
]
