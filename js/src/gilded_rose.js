function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

Item.MIN_QUALITY = 0;
Item.QUALITY_GRANULARITY = 1;

var items = [];

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    var currentItem = items[i],
      isNotAged = currentItem.name != 'Aged Brie',
      isNotBackstage = currentItem.name != 'Backstage passes to a TAFKAL80ETC concert',
      isNotSulfuras = currentItem.name != 'Sulfuras, Hand of Ragnaros';


    if (isNotAged && isNotBackstage) {
      if (currentItem.quality > Item.MIN_QUALITY) {
        if (isNotSulfuras) {
          currentItem.quality = currentItem.quality - Item.QUALITY_GRANULARITY;
        }
      }
    } else {
      if (currentItem.quality < 50) {
        currentItem.quality = currentItem.quality + 1;
        if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (currentItem.sell_in < 11) {
            if (currentItem.quality < 50) {
              currentItem.quality = currentItem.quality + 1;
            }
          }
          if (currentItem.sell_in < 6) {
            if (currentItem.quality < 50) {
              currentItem.quality = currentItem.quality + 1;
            }
          }
        }
      }
    }
    if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
      currentItem.sell_in = currentItem.sell_in - 1;
    }
    if (currentItem.sell_in < 0) {
      if (isNotAged) {
        if (isNotBackstage) {
          if (currentItem.quality > 0) {
            if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
              currentItem.quality = currentItem.quality - 1
            }
          }
        } else {
          currentItem.quality = currentItem.quality - currentItem.quality
        }
      } else {
        if (currentItem.quality < 50) {
          currentItem.quality = currentItem.quality + 1
        }
      }
    }
  }
}
