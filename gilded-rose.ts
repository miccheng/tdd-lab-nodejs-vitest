export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name: string, sellIn: number, quality: number) {
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

  constructor(items = [] as Item[]) {
    this.items = items
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const subjectItem = this.items[i]

      if (
        ![SpecialProductCategories.AgedBrie.valueOf(), SpecialProductCategories.BackstagePass.valueOf()].includes(subjectItem.name) &&
        subjectItem.quality > 0 &&
        subjectItem.name !== SpecialProductCategories.Sulfuras
      ) {
        subjectItem.quality = subjectItem.quality - 1
      } else if (subjectItem.quality < 50) {
        if (
          subjectItem.name === SpecialProductCategories.BackstagePass &&
          (subjectItem.sellIn < 11 || subjectItem.sellIn < 6)
        ) {
          subjectItem.quality = subjectItem.quality + 2
        } else {
          subjectItem.quality = subjectItem.quality + 1
        }
      }

      if (subjectItem.name !== SpecialProductCategories.Sulfuras) {
        subjectItem.sellIn = subjectItem.sellIn - 1
      }

      if (subjectItem.sellIn < 0) {
        if (subjectItem.name !== SpecialProductCategories.AgedBrie) {
          if (subjectItem.name !== SpecialProductCategories.BackstagePass) {
            if (subjectItem.quality > 0) {
              if (subjectItem.name !== SpecialProductCategories.Sulfuras) {
                subjectItem.quality = subjectItem.quality - 1
              }
            }
          } else {
            subjectItem.quality = subjectItem.quality - subjectItem.quality
          }
        } else {
          if (subjectItem.quality < 50) {
            subjectItem.quality = subjectItem.quality + 1
          }
        }
      }
    }

    return this.items
  }
}
