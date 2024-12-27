import type { Action } from './types/Action'
import type { Game } from './types/Game'
import type { Phase } from './types/Phase'
import type { Round } from './types/Round'
import type { Turn } from './types/Turn'

export class GameEngine<TState, TPayload> {
  private currentAction: Action<TState, TPayload> | null = null
  private currentPhase: Phase<TState, TPayload> | null = null
  private currentRound: Round<TState, TPayload> | null = null
  private currentTurn: Turn<TState, TPayload> | null = null
  private game: Game<TState, TPayload>
  private state: TState

  constructor(game: Game<TState, TPayload>, initialState: TState) {
    this.game = game
    this.state = initialState
  }

  getCurrentAction(): Action<TState, TPayload> | null {
    return this.currentAction
  }

  getCurrentPhase(): Phase<TState, TPayload> | null {
    return this.currentPhase
  }

  getCurrentRound(): Round<TState, TPayload> | null {
    return this.currentRound
  }

  getCurrentTurn(): Turn<TState, TPayload> | null {
    return this.currentTurn
  }

  getState(): TState {
    return this.state
  }

  start(): void {
    if (this.game.validate?.(this.state) === false) {
      throw new Error('Invalid game state')
    }

    this.state = this.game.onEnter?.(this.state) ?? this.state
    this.startNextRound()
  }

  executeAction(payload: TPayload): void {
    if (!this.currentAction) {
      throw new Error('No current action')
    }

    if (this.currentAction.validate?.(this.state, payload) === false) {
      throw new Error('Invalid action payload')
    }

    this.state = this.currentAction.execute(this.state, payload)
    this.startNextAction()
  }

  private startNextAction(): void {
    if (!this.currentPhase) {
      throw new Error('No current phase')
    }

    const currentActionIndex = this.currentPhase.actions.indexOf(this.currentAction!)
    const nextAction = this.currentPhase.actions[currentActionIndex + 1]

    if (nextAction) {
      this.currentAction = nextAction
    } else {
      this.state = this.currentPhase.onComplete?.(this.state) ?? this.state
      this.startNextPhase()
    }
  }

  private startNextPhase(): void {
    if (!this.currentTurn) {
      throw new Error('No current turn')
    }

    const currentPhaseIndex = this.currentTurn.phases.indexOf(this.currentPhase!)
    const nextPhase = this.currentTurn.phases[currentPhaseIndex + 1]

    if (nextPhase) {
      if (nextPhase.validate?.(this.state) === false) {
        throw new Error('Invalid phase state')
      }

      this.currentPhase = nextPhase
      this.state = nextPhase.onEnter?.(this.state) ?? this.state
      this.currentAction = nextPhase.actions[0]
    } else {
      this.state = this.currentTurn.onComplete?.(this.state) ?? this.state
      this.startNextTurn()
    }
  }

  private startNextTurn(): void {
    if (!this.currentRound) {
      throw new Error('No current round')
    }

    const currentTurnIndex = this.currentRound.turns.indexOf(this.currentTurn!)
    const nextTurn = this.currentRound.turns[currentTurnIndex + 1]

    if (nextTurn) {
      if (nextTurn.validate?.(this.state) === false) {
        throw new Error('Invalid turn state')
      }

      this.currentTurn = nextTurn
      this.state = nextTurn.onEnter?.(this.state) ?? this.state
      this.startNextPhase()
    } else {
      this.state = this.currentRound.onComplete?.(this.state) ?? this.state
      this.startNextRound()
    }
  }

  private startNextRound(): void {
    const currentRoundIndex = this.game.rounds.indexOf(this.currentRound!)
    const nextRound = this.game.rounds[currentRoundIndex + 1]

    if (nextRound) {
      if (nextRound.validate?.(this.state) === false) {
        throw new Error('Invalid round state')
      }

      this.currentRound = nextRound
      this.state = nextRound.onEnter?.(this.state) ?? this.state
      this.startNextTurn()
    } else {
      this.state = this.game.onComplete?.(this.state) ?? this.state
    }
  }
}
