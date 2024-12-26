import { describe, expect, it } from 'bun:test'
import { uniqueId } from './uniqueId'

describe('uniqueId', () => {
  it('generates a valid unique ID string with default length', () => {
    const id = uniqueId()
    expect(id).toMatch(/^U[0-9a-zA-Z]{15}$/)
  })

  it('generates IDs with specified length', () => {
    expect(uniqueId(5)).toMatch(/^U[0-9a-zA-Z]{5}$/)
    expect(uniqueId(10)).toMatch(/^U[0-9a-zA-Z]{10}$/)
    expect(uniqueId(20)).toMatch(/^U[0-9a-zA-Z]{20}$/)
  })

  it('always starts with U', () => {
    for (let i = 0; i < 100; i++) {
      expect(uniqueId().startsWith('U')).toBe(true)
    }
  })

  it('generates unique values', () => {
    const ids = new Set<string>()
    for (let i = 0; i < 1000; i++) {
      ids.add(uniqueId())
    }
    expect(ids.size).toBe(1000)
  })

  it('uses all character types', () => {
    // Generate a large sample to ensure we hit all character types
    const sample = uniqueId(1000).slice(1) // Remove U prefix
    expect(sample).toMatch(/[0-9]/) // Contains numbers
    expect(sample).toMatch(/[a-z]/) // Contains lowercase
    expect(sample).toMatch(/[A-Z]/) // Contains uppercase
  })

  it('maintains consistent length', () => {
    const lengths = [5, 10, 15, 20]
    lengths.forEach(length => {
      expect(uniqueId(length)).toHaveLength(length + 1) // +1 for 'U' prefix
    })
  })

  it('uses only valid characters', () => {
    const id = uniqueId(100).slice(1) // Remove the U prefix, use large sample
    expect(id).toMatch(/^[0-9a-zA-Z]+$/)
    expect(id).not.toMatch(/[^0-9a-zA-Z]/) // No invalid characters
  })
})
