import { describe, expect, it } from 'vitest'
import { GildedRose, Item } from './gilded-rose'

describe('Gilded Rose', () => {
  it('should keep the item name', () => {
    const item = new Item('foo', 0, 0)
    const gildedRose = new GildedRose([item])

    gildedRose.updateQuality()

    expect(item.name).toBe('foo')
  })
})
