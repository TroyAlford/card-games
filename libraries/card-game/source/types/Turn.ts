import type { Phase } from './Phase'

export interface Turn<TState = unknown, TPayload = unknown> {
  id: string,
  name: string,
  onComplete?: (state: TState) => TState,
  onEnter?: (state: TState) => TState,
  phases: Phase<TState, TPayload>[],
  playerId: string,
  validate?: (state: TState) => boolean,
}
