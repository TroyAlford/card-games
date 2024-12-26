import type { Event } from './Event'

export abstract class Phase {
  public abstract name: string
  public abstract description: string

  public abstract canTransition(): boolean
  public abstract handleEvent(event: Event): Promise<void>
}
