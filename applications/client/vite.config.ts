import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@card-games/components': path.resolve(__dirname, '../../libraries/components'),
      '@card-games/types': path.resolve(__dirname, '../../libraries/types'),
    },
  },
})
