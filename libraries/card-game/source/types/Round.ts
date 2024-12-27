import type { Turn } from './Turn'

export interface Round<TState = unknown, TPayload = unknown> {
  id: string,
  name: string,
  onComplete?: (state: TState) => TState,
  onEnter?: (state: TState) => TState,
  turns: Turn<TState, TPayload>[],
  validate?: (state: TState) => boolean,
}
