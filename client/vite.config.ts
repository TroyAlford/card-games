import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
	plugins: [
		react({
			babel: {
				parserOpts: {
					plugins: ['decorators-legacy', 'classProperties']
				}
			}
		})
	],
	resolve: {
		alias: {
			'@card-games/game-engine': resolve(__dirname, '../libraries/game-engine'),
			'@card-games/card-game': resolve(__dirname, '../libraries/card-game'),
		}
	}
}) 