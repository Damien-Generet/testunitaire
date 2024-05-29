const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 10),
      new Item("Elixir of the Mongoose", 0, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[4]) || 4;;
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

  it("brie quality +1 when sellIn -1", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(11);
  });

  it("all exept brie loose 1 quality per day", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it("Quality is limited to 50 except Sulfuras", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(3);
    expect(items[0].quality).toBe(50);
  });

  it("Quality can't be negative", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(0);
  });

  it("Quality decrease 2 times faster when expired", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 0, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(5);
  });

//conjured items
it("conjured item decreases 2 times faster than normal items", function() {
  const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
  const items = gildedRose.updateQuality();
  expect(items[0].sellIn).toBe(2);
  expect(items[0].quality).toBe(4);
});


  
});