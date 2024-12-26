/**
 * Configuration for a draw source.
 */
export interface DrawSourceConfig {
  /** Location of the draw source */
  location: 'center' | 'player',

  /** Owner of the draw source (if personal) */
  ownerId?: string,

  /** Type of draw source */
  type: 'shared' | 'personal',
}

/**
 * Configuration for a card-specific draw source.
 */
export interface CardDrawSourceConfig extends DrawSourceConfig {
  /** Initial cards in the source */
  initialCards: any[],

  /** Maximum number of visible cards */
  maxVisible?: number,

  /** Whether to shuffle on initialization */
  shuffle?: boolean,
}
