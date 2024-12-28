import type { PlayerGameState } from 'libraries/types'
import { uniqueId } from 'libraries/utilities'
import type { Action } from './types/Action'
import type { GameOptions } from './types/GameOptions'
import type { GameState } from './types/GameState'

export abstract class Game<
  Options extends GameOptions = GameOptions,
  State extends GameState = GameState,
> {
  static id: string
  static name: string

  protected state: State = this.initialState
  protected get initialState(): State {
    const id = uniqueId()
    return { id, name: `${this.constructor.name} (${id})`, players: [] }
  }

  constructor(public options?: Partial<Options>) {}

  abstract getAvailableActions(): Action<State>[]
  abstract getCurrentPlayerId(): string
  abstract initialize(playerIds: string[]): State

  action(): void { return }
  view(playAreaId: string): void { return }
}
