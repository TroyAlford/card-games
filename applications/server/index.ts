import { GameServer } from './source/GameServer'

const server = GameServer.singleton()

process.on('SIGKILL', () => {
  server.dispose()
  process.exit(0)
})
process.on('SIGINT', () => {
  server.dispose()
  process.exit(0)
})
