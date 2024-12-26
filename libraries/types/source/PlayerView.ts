import type { ICard } from './Card'
import type { Phase } from './Phase'
import type { PlayArea } from './PlayArea'

/**
 * Represents what a player can see of the game state.
 * This is a filtered view based on visibility rules.
 */
export interface PlayerView {
  /** Whether this player can play cards */
  canPlay: boolean,

  /** Current phase of the turn */
  currentPhase: Phase,

  /** Current turn's player ID */
  currentTurn: string,

  /** Game this view belongs to */
  gameId: string,

  /** Cards in player's hand */
  hand: ICard[],

  /** Whether it's this player's turn */
  isMyTurn: boolean,

  /** Information about other players */
  otherPlayers: {
    /** Number of cards in hand */
    handSize: number,
    /** Player's unique ID */
    id: string,
    /** Player's display name */
    name: string,
    /** Player's team (if any) */
    team?: string,
  }[],

  /** Player this view is for */
  playerId: string,

  /** Current game status */
  status: string,

  /** Cards on the table */
  table: ICard[],

  /** Play areas visible to this player */
  visiblePlayAreas: PlayArea[],
}
