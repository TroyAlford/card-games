import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy'],
        },
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['module-resolver', {
            alias: {
              '@card-games/components': '../../libraries/components',
              '@card-games/types': '../../libraries/types',
            },
            root: ['.'],
          }],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@card-games/components': path.resolve(__dirname, '../../libraries/components'),
      '@card-games/types': path.resolve(__dirname, '../../libraries/types'),
    },
  },
})
