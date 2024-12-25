export interface TriggerCondition {
	type: string
	predicate: (event: any) => boolean
}

export interface TriggerEffect {
	type: string
	apply: (context: any) => void | Promise<void>
}

export class Trigger {
	public readonly condition: TriggerCondition
	public readonly effect: TriggerEffect

	constructor(condition: TriggerCondition, effect: TriggerEffect) {
		this.condition = condition
		this.effect = effect
	}

	public async execute(event: any, context: any): Promise<void> {
		if (this.condition.predicate(event)) {
			await this.effect.apply(context)
		}
	}
} 