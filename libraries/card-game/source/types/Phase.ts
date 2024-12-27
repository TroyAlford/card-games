import type { Action } from './Action'

export interface Phase<TState = unknown, TPayload = unknown> {
  actions: Action<TState, TPayload>[],
  id: string,
  name: string,
  onComplete?: (state: TState) => TState,
  onEnter?: (state: TState) => TState,
  validate?: (state: TState) => boolean,
}
