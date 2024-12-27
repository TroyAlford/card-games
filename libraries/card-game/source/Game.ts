import type { PlayerState } from '@card-games/types'
import { uniqueId } from '@card-games/utilities'
import type { Action } from './types/Action'
import type { GameOptions } from './types/GameOptions'

export interface GameState {
  currentPlayerId: string | null,
  players: PlayerState[],
}

/** Abstract base class for card games */
export abstract class Game<
  Options extends GameOptions = GameOptions,
  State extends GameState = GameState,
> {
  protected options: Options
  protected state: State

  get defaultOptions(): Partial<GameOptions> {
    return {
      maxPlayers: 0,
      minPlayers: 0,
    }
  }

  get initialState(): GameState {
    return {
      currentPlayerId: null,
      players: [],
    }
  }

  constructor(options?: Partial<Options>) {
    // First, configure the game options
    const id = uniqueId()
    this.options = {
      ...this.defaultOptions,
      ...options,
      id,
      name: options?.name ?? id,
    } as Options

    // Now, state can be initialized based on the options
    this.state = this.initialState as State
  }

  get id(): string {
    return this.options.id
  }

  get maxPlayers(): number {
    return this.options.maxPlayers
  }

  get minPlayers(): number {
    return this.options.minPlayers
  }

  get name(): string {
    return this.options.name
  }

  /**
   * Get the available actions for the current player
   */
  abstract getAvailableActions(): Action<State>[]

  /**
   * Get the current player's ID
   */
  abstract getCurrentPlayerId(): string

  /**
   * Execute an action and determine what happens next
   * @param action - The action to execute. Game implementations should:
   *  - validate the action
   *  - execute the action
   *  - update the game state
   */
  abstract action(action: Action<State>): void
}
