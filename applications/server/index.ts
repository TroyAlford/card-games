import { GameServer } from './source/GameServer'

const server = GameServer.singleton()

const dispose = () => {
  server.dispose()
  process.exit(0)
}

process.on('SIGTERM', dispose)
process.on('SIGKILL', dispose)
process.on('SIGINT', dispose)
