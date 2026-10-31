import { describe, expect, it } from 'vitest'
import { GildedRose, Item } from './gilded-rose'

describe('Gilded Rose', () => {
  it('should keep the item name', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)])
    const items = gildedRose.updateQuality()
    expect(items[0].name).toBe('foo')
  })
})
