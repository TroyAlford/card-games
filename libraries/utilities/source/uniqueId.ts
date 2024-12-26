const NUMBERS = '0123456789'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const DICTIONARY = `${NUMBERS}${LETTERS}${LETTERS.toUpperCase()}`

/**
 * Generates a unique ID string.
 * Format: U + 15 random alphanumeric characters
 * @param length - The length of the ID to generate. Defaults to 15.
 * @returns A 16-character unique string
 */
export function uniqueId(length = 15): string {
  let id = 'U'
  for (let i = 0; i < length; i++) {
    id += DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)]
  }
  return id
}
