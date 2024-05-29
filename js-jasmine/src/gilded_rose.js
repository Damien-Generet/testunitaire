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
    // Parcourir tous les articles du magasin
    for (var i = 0; i < this.items.length; i++) {
      // Si l'article n'est ni "Aged Brie" ni "Backstage passes"
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // Si la qualité est supérieure à 0
        if (this.items[i].quality > 0) {
          // Si l'article n'est pas "Sulfuras"
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            // Diminuer la qualité de 1
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        // Si l'article est "Aged Brie" ou "Backstage passes"
        // et que la qualité est inférieure à 50
        if (this.items[i].quality < 50) {
          // Augmenter la qualité de 1
          this.items[i].quality = this.items[i].quality + 1;

          // Si l'article est "Backstage passes"
          if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
            // Si le "sellIn" est inférieur à 11 jours
            if (this.items[i].sellIn < 11) {
              // Si la qualité est inférieure à 50
              if (this.items[i].quality < 50) {
                // Augmenter la qualité de 1 supplémentaire
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            // Si le "sellIn" est inférieur à 6 jours
            if (this.items[i].sellIn < 6) {
              // Si la qualité est inférieure à 50
              if (this.items[i].quality < 50) {
                // Augmenter la qualité de 1 supplémentaire
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      // Si l'article n'est pas "Sulfuras"
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        // Diminuer le "sellIn" de 1
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      // Si le "sellIn" est inférieur à 0
      if (this.items[i].sellIn < 0) {
        // Si l'article n'est pas "Aged Brie"
        if (this.items[i].name != "Aged Brie") {
          // Si l'article n'est pas "Backstage passes"
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
            // Si la qualité est supérieure à 0
            if (this.items[i].quality > 0) {
              // Si l'article n'est pas "Sulfuras"
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                // Diminuer la qualité de 1
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            // Pour "Backstage passes", si le "sellIn" est inférieur à 0, la qualité devient 0
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          // Pour "Aged Brie", si la qualité est inférieure à 50
          if (this.items[i].quality < 50) {
            // Augmenter la qualité de 1
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};