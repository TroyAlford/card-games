/**
 * Configuration for a draw source.
 */
export interface DrawSourceConfig {
	/** Type of draw source */
	type: 'shared' | 'personal'

	/** Location of the draw source */
	location: 'center' | 'player'

	/** Owner of the draw source (if personal) */
	ownerId?: string
}

/**
 * Configuration for a card-specific draw source.
 */
export interface CardDrawSourceConfig extends DrawSourceConfig {
	/** Initial cards in the source */
	initialCards: any[]

	/** Whether to shuffle on initialization */
	shuffle?: boolean

	/** Maximum number of visible cards */
	maxVisible?: number
} 