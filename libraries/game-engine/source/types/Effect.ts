export interface Effect {
	type: string
	property: string
	operation: 'add' | 'multiply' | 'set' | 'transform'
	value: number | string | ((current: any) => any)
	priority?: number // Higher priority effects apply last
} 