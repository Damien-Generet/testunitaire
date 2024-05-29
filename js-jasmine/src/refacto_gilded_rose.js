class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (!this.isLegendary(item)) {
        this.updateItemQuality(item);
        this.updateItemSellIn(item);
        if (item.sellIn < 0) {
          this.handleExpiredItem(item);
        }
      }
    });

    return this.items;
  }

  isLegendary(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  updateItemQuality(item) {
    if (item.name === 'Aged Brie') {
      this.increaseQuality(item);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      this.updateBackstagePassQuality(item);
    } else {
      this.decreaseQuality(item);
    }
  }

  updateBackstagePassQuality(item) {
    this.increaseQuality(item);
    if (item.sellIn < 11) this.increaseQuality(item);
    if (item.sellIn < 6) this.increaseQuality(item);
  }

  updateItemSellIn(item) {
    item.sellIn -= 1;
  }

  handleExpiredItem(item) {
    if (item.name === 'Aged Brie') {
      this.increaseQuality(item);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      item.quality = 0;
    } else {
      this.decreaseQuality(item);
    }
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  decreaseQuality(item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  }
}

module.exports = {
  Item,
  Shop
};