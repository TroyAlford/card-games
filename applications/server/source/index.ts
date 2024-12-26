import type * as Type from '@card-games/types'
import { uniqueId } from '@card-games/utilities'
import type { Server, ServerWebSocket } from 'bun'
import type { GameLobby } from './types/GameLobby'

interface WebSocketData {
  gameId?: string,
  playerId: string,
}

// Store active game lobbies
const games = new Map<string, GameLobby>()

/**
 * Generate a unique 8-digit code for game lobbies
 * @returns - A unique 8-digit code
 */
function generateGameCode(): string {
  return Math.random().toString().substring(2, 10)
}

/**
 * Create a new game lobby
 * @param password - The password of the game
 * @returns - The new game lobby
 */
function createGame(password?: string): GameLobby {
  const gameState: Type.GameState = {
    commonArea: {
      cards: [],
      id: uniqueId(),
      name: 'Common Area',
      type: 'common',
    },
    commonDecks: [],
    id: uniqueId(),
    name: 'Game',
    players: [],
  }

  const lobby: GameLobby = {
    code: generateGameCode(),
    gameState,
    id: uniqueId(),
    password,
    players: new Map(),
  }

  games.set(lobby.id, lobby)
  return lobby
}

/**
 * Find a game by its code
 * @param code - The code of the game
 * @returns - The game lobby
 */
function findGameByCode(code: string): GameLobby | undefined {
  return Array.from(games.values()).find(game => game.code === code)
}

Bun.serve({
  fetch(request, server) {
    if (server.upgrade(request)) {
      return
    }
  },
  port: 8080,
  websocket: {
    message(ws: ServerWebSocket<WebSocketData>, message: string) {
      try {
        const data = JSON.parse(message)

        switch (data.type) {
          case 'CREATE_GAME': {
            const game = createGame(data.password)
            ws.data.gameId = game.id
            game.players.set(ws.data.playerId, ws)
            ws.send(JSON.stringify({
              code: game.code,
              type: 'GAME_CREATED',
            }))
            break
          }

          case 'JOIN_GAME': {
            const game = findGameByCode(data.code)
            if (!game) {
              ws.send(JSON.stringify({
                error: 'Game not found',
                type: 'ERROR',
              }))
              return
            }

            if (game.password && game.password !== data.password) {
              ws.send(JSON.stringify({
                error: 'Invalid password',
                type: 'ERROR',
              }))
              return
            }

            ws.data.gameId = game.id
            game.players.set(ws.data.playerId, ws)
            ws.send(JSON.stringify({
              gameState: game.gameState,
              type: 'GAME_JOINED',
            }))

            // Notify other players
            game.players.forEach((player, id) => {
              if (id !== ws.data.playerId) {
                player.send(JSON.stringify({
                  type: 'PLAYER_JOINED',
                }))
              }
            })
            break
          }
        }
      } catch (error) {
        ws.send(JSON.stringify({
          error: 'Invalid message format',
          type: 'ERROR',
        }))
      }
    },
    open(ws) {
      ws.data = {
        playerId: uniqueId(),
      }
      ws.send(JSON.stringify({
        playerId: ws.data.playerId,
        type: 'CONNECTED',
      }))
    },
  },
})
