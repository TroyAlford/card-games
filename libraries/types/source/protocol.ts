import type { PlayerGameState } from './PlayerGameState'
import type { UserProfile } from './UserProfile'

export enum MessageType {
  Connected = 'CONNECTED',
  CreateGame = 'CREATE_GAME',
  Error = 'ERROR',
  Game = 'GAME',
  GameState = 'GAME_STATE',
  JoinGame = 'JOIN_GAME',
}

// Client -> Server Messages
export interface CreateGameMessage {
  gameType: string,
  password?: string,
  type: MessageType.CreateGame,
}

export interface JoinGameMessage {
  code: string,
  password?: string,
  type: MessageType.JoinGame,
}

export type ClientMessage =
  | CreateGameMessage
  | JoinGameMessage

// Server -> Client Messages
export interface ConnectedMessage {
  profile: UserProfile,
  type: MessageType.Connected,
}

export interface ErrorMessage {
  error: string,
  type: MessageType.Error,
}

export interface GameMessage {
  code: string,
  gameId: string,
  state?: PlayerGameState,
  type: MessageType.Game,
}

export interface GameStateMessage {
  state: PlayerGameState,
  type: MessageType.GameState,
}

export type ServerMessage =
  | ConnectedMessage
  | ErrorMessage
  | GameMessage
  | GameStateMessage
