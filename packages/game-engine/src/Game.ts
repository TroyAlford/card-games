import type { GameState } from './types'
import type { Phase } from './Phase'
import type { Turn } from './Turn'
import type { Event } from './Event'

export abstract class Game<
	State extends GameState = GameState,
	PhaseType extends Phase = Phase,
	TurnType extends Turn = Turn,
	EventType extends Event = Event
> {
	protected state: State
	protected phases: PhaseType[]
	protected currentPhase: number = 0
	protected turns: TurnType[] = []
	protected events: EventType[] = []

	constructor(initialState: State) {
		this.state = initialState
		this.phases = this.setupPhases()
	}

	protected abstract setupPhases(): PhaseType[]

	public abstract save(): Promise<void>
	public abstract load(): Promise<void>

	public getCurrentPhase(): PhaseType {
		return this.phases[this.currentPhase]
	}

	public async processEvent(event: EventType): Promise<void> {
		this.events.push(event)
		await this.getCurrentPhase().handleEvent(event)
		await this.save()
	}
} 