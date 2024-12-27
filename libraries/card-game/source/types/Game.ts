import type { Round } from './Round'

export interface Game<TState = unknown, TPayload = unknown> {
  id: string,
  name: string,
  onComplete?: (state: TState) => TState,
  onEnter?: (state: TState) => TState,
  rounds: Round<TState, TPayload>[],
  validate?: (state: TState) => boolean,
}
