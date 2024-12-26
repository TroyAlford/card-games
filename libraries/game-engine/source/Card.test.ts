import * as Type from '@card-games/types'
import { describe, expect, it } from 'bun:test'
import { Card } from './Card'
import { ColorStore } from './stores/ColorStore'
import { SuitStore } from './stores/SuitStore'

describe('Card', () => {
  const suitStore = new SuitStore()
  const colorStore = new ColorStore()
  const originalCard: Type.Card = {
    id: 'test-card',
    rank: Type.Rank.Ace,
    suit: 'hearts',
  }

  it('initializes with original data', () => {
    const card = new Card(originalCard, colorStore, suitStore)
    expect(card.id).toBe('test-card')
    expect(card.rank).toBe(Type.Rank.Ace)
    expect(card.suitId).toBe('hearts')
  })

  it('retrieves suit object correctly', () => {
    const card = new Card(originalCard, colorStore, suitStore)
    const suit = card.suit
    expect(suit.id).toBe('hearts')
    expect(suit.name).toBe('Hearts')
    expect(suit.symbol).toBe('♥')
    expect(suit.color).toBe('red')
  })

  it('retrieves color object correctly', () => {
    const card = new Card(originalCard, colorStore, suitStore)
    const color = card.color
    expect(color.id).toBe('red')
    expect(color.name).toBe('Red')
    expect(color.value).toBe('#FF0000')
  })

  it('throws error for invalid suit', () => {
    const invalidCard: Type.Card = {
      ...originalCard,
      suit: 'invalid',
    }
    const card = new Card(invalidCard, colorStore, suitStore)
    expect(() => card.suit).toThrow('Unknown suit: invalid')
  })

  it('throws error for invalid color', () => {
    const invalidSuit: Type.Suit = {
      color: 'invalid',
      id: 'test',
      name: 'Test',
      symbol: 'T',
    }
    suitStore.addSuit(invalidSuit)
    const invalidCard: Type.Card = {
      ...originalCard,
      suit: 'test',
    }
    const card = new Card(invalidCard, colorStore, suitStore)
    expect(() => card.color).toThrow('Unknown color: invalid')
  })

  it('serializes to JSON correctly', () => {
    const card = new Card(originalCard, colorStore, suitStore)
    const json = card.toJSON()
    expect(json).toEqual({
      color: 'red',
      id: 'test-card',
      rank: Type.Rank.Ace,
      suit: 'hearts',
    })
  })

  describe('with current state', () => {
    it('honors current state over original', () => {
      const card = new Card(originalCard, colorStore, suitStore)
      // @ts-expect-error Testing private field
      card.current = {
        color: 'black',
        id: 'modified-card',
        rank: Type.Rank.King,
        suit: 'spades',
      }
      expect(card.id).toBe('modified-card')
      expect(card.rank).toBe(Type.Rank.King)
      expect(card.suitId).toBe('spades')
      expect(card.colorId).toBe('black')
    })

    it('falls back to original state when current is partial', () => {
      const card = new Card(originalCard, colorStore, suitStore)
      // @ts-expect-error Testing private field
      card.current = {
        id: 'modified-card',
      }
      expect(card.id).toBe('modified-card')
      expect(card.rank).toBe(Type.Rank.Ace)
      expect(card.suitId).toBe('hearts')
    })
  })
})
