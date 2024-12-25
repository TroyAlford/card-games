import { Server } from 'basis/libraries/server'

Bun.serve({
	fetch(request: Request): Response | Promise<Response> {
		return new Response('Hello World')
	},
	port: 3000,
})
