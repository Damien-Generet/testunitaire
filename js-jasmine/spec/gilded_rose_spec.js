const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 10),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  // it("should foo", function() {
  //   const gildedRose = new Shop([new Item("foo", 0, 0)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].name).toBe("fixme");
  // });

  it("Increases quality by 1 if Backstage passes SellIn > 11", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 13, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(12);
    expect(items[0].quality).toBe(23);
  });

  it("Increases quality by 2 if Backstage passes SellIn <= 10 && > 5", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 7, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(6);
    expect(items[0].quality).toBe(24);
  });

  it("Increases quality by 3 if Backstage passes SellIn <= 5", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(3);
    expect(items[0].quality).toBe(25);
  });

  it("Concert SellIn === 0 AgedBrie quality is 0", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 13), new Item("Aged Brie", 4, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
    expect(items[1].sellIn).toBe(3);
    expect(items[1].quality).toBe(0);
  });

  it("Sulfuras quality should not move", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
  });

 
  
});