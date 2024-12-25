export interface Color {
	name: string
	hex: string
}

export const STANDARD_COLORS: Record<string, Color> = {
	red: { name: 'Red', hex: '#ff0000' },
	black: { name: 'Black', hex: '#000000' }
} 