export interface Action<TState = unknown, TPayload = unknown> {
  execute: (state: TState, payload: TPayload) => TState,
  id: string,
  name: string,
  validate?: (state: TState, payload: TPayload) => boolean,
}
