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

const DEFAULT_QUALITY_PROGRESSION = -1

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

      let qualityRate = DEFAULT_QUALITY_PROGRESSION

      // Legendary Item - cannot sell & won't degrade in quality
      if (item.name === SpecialProductCategories.Sulfuras) {
        continue
      }

      item.sellIn = item.sellIn - 1

      // Increases in Quality
      if (item.name === SpecialProductCategories.AgedBrie) {
        qualityRate = 1
      }

      // Becomes more valuable closer to the concert date. Drops to zero after the concert.
      if (item.name === SpecialProductCategories.BackstagePass) {
        if (item.sellIn < 0) {
          qualityRate = -item.quality
        } else {
          qualityRate = 1
          if (item.sellIn < 5) {
            qualityRate = 3
          } else if (item.sellIn < 10) {
            qualityRate = 2
          }
        }
      }

      if (item.sellIn < 0) {
        qualityRate = qualityRate * 2
      }
      item.quality = item.quality + qualityRate

      if (item.quality < 0) item.quality = 0
      if (item.quality > 50) item.quality = 50
    }

    return this.items
  }
}
