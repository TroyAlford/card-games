export interface Color {
  hex: string,
  name: string,
}

export const STANDARD_COLORS: Record<string, Color> = {
  black: { hex: '#000000', name: 'Black' },
  red: { hex: '#ff0000', name: 'Red' },
}
