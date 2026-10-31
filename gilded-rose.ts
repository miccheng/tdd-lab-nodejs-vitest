export class Item {
  name: string
  sellIn: number
  quality: number

  constructor (name: string, sellIn: number, quality: number) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

const SpecialProductCategories = {
  AgedBrie: 'Aged Brie',
  BackstagePass: 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras: 'Sulfuras, Hand of Ragnaros'
} as const

export class GildedRose {
  items: Item[]

  constructor (items = [] as Item[]) {
    this.items = items
  }

  updateQuality () {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]

      if (item.name !== SpecialProductCategories.AgedBrie && item.name !== SpecialProductCategories.BackstagePass) {
        if (item.quality > 0) {
          if (item.name !== SpecialProductCategories.Sulfuras) {
            item.quality = item.quality - 1
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if (item.name === SpecialProductCategories.BackstagePass) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
          }
        }
      }
      if (item.name !== SpecialProductCategories.Sulfuras) {
        item.sellIn = item.sellIn - 1
      }
      if (item.sellIn < 0) {
        if (item.name !== SpecialProductCategories.AgedBrie) {
          if (item.name !== SpecialProductCategories.BackstagePass) {
            if (item.quality > 0) {
              if (item.name !== SpecialProductCategories.Sulfuras) {
                item.quality = item.quality - 1
              }
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }
    }

    return this.items
  }
}
