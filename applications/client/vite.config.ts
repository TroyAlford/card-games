import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties'],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@card-games/card-game': resolve(__dirname, '../libraries/card-game'),
      '@card-games/game-engine': resolve(__dirname, '../libraries/game-engine'),
    },
  },
})
