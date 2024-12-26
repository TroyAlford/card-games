export interface DrawSourceConfig {
  id: string,
  location: 'center' | 'player',
  maxCards?: number,
  startingCards?: number,
  type: 'shared' | 'personal',
}

export abstract class DrawSource {
  public readonly id: string
  public readonly type: DrawSourceConfig['type']
  public readonly location: DrawSourceConfig['location']
  protected readonly maxCards: number
  protected readonly startingCards: number

  constructor(config: DrawSourceConfig) {
    this.id = config.id
    this.type = config.type
    this.location = config.location
    this.maxCards = config.maxCards ?? Infinity
    this.startingCards = config.startingCards ?? 0
  }

  abstract initialize(): void
  abstract draw(count?: number): Promise<any[]>
  abstract shuffle(): void
}
