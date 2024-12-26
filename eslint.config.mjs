// @ts-expect-error - no types for the eslint plugin file... who cares?
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
]
