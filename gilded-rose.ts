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

const DEFAULT_SELL_IN_PROGRESSION = -1
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

      let sellInRate = DEFAULT_SELL_IN_PROGRESSION
      let qualityRate = DEFAULT_QUALITY_PROGRESSION

      if (item.name === SpecialProductCategories.Sulfuras) {
        continue
      }

      if (item.name === SpecialProductCategories.AgedBrie) {
        item.sellIn = item.sellIn + sellInRate

        qualityRate = 1
        if (item.sellIn < 0) {
          qualityRate = qualityRate * 2
        }

        item.quality = item.quality + qualityRate

        if (item.quality > 50) item.quality = 50
        continue
      }

      if (item.name === SpecialProductCategories.BackstagePass) {
        item.sellIn = item.sellIn + sellInRate

        if (item.sellIn < 0) {
          item.quality = 0
        } else {
          qualityRate = 1
          if (item.sellIn < 5) {
            qualityRate = 3
          } else if (item.sellIn < 10) {
            qualityRate = 2
          }

          item.quality = item.quality + qualityRate
          if (item.quality > 50) item.quality = 50
        }
        continue
      }

      item.sellIn = item.sellIn + sellInRate

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
