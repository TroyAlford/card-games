import type { PlayerView } from './PlayerView'

/**
 * Callback for game state updates.
 */
export type GameStateCallback = (view: PlayerView) => void

/**
 * Callback for game errors.
 */
export type ErrorCallback = (message: string) => void 