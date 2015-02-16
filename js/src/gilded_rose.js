function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

Item.MIN_QUALITY = 0;
Item.QUALITY_GRANULARITY = 1;
Item.MAX_QUALITY = 50;
Item.DOUBLE_THRESHOLD = 11;
Item.TRIPLE_THRESHOLD = 6;
Item.SELLIN_GRANULARITY = 1;
Item.MIN_SELLIN = 0;

var items = [];

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    var currentItem = items[i],
    isNotAged = currentItem.name != 'Aged Brie',
    isNotBackstage = currentItem.name != 'Backstage passes to a TAFKAL80ETC concert',
    isNotSulfuras = currentItem.name != 'Sulfuras, Hand of Ragnaros',
    isBackstage = currentItem.name == 'Backstage passes to a TAFKAL80ETC concert';

    if (isNotAged && isNotBackstage) {
      if (currentItem.quality > Item.MIN_QUALITY) {
        if (isNotSulfuras) {
          currentItem.quality = currentItem.quality - Item.QUALITY_GRANULARITY;
        }
      }
    } else {
      if (currentItem.quality < Item.MAX_QUALITY) {
        currentItem.quality = currentItem.quality + Item.QUALITY_GRANULARITY;
        if (isBackstage) {
          if (currentItem.sell_in < Item.DOUBLE_THRESHOLD) {
            if (currentItem.quality < Item.MAX_QUALITY) {
              currentItem.quality = currentItem.quality + Item.QUALITY_GRANULARITY;
            }
          }
          if (currentItem.sell_in < Item.TRIPLE_THRESHOLD) {
            if (currentItem.quality < Item.MAX_QUALITY) {
              currentItem.quality = currentItem.quality + Item.QUALITY_GRANULARITY;
            }
          }
        }
      }
    }
    if (isNotSulfuras) {
      currentItem.sell_in = currentItem.sell_in - Item.SELLIN_GRANULARITY;
    }
    if (currentItem.sell_in < Item.MIN_SELLIN) {
      if (isNotAged) {
        if (isNotBackstage) {
          if (currentItem.quality > Item.MIN_QUALITY) {
            if (isNotSulfuras) {
              currentItem.quality = currentItem.quality - Item.QUALITY_GRANULARITY
            }
          }
        } else {
          currentItem.quality = currentItem.quality - currentItem.quality
        }
      } else {
        if (currentItem.quality < Item.MAX_QUALITY) {
          currentItem.quality = currentItem.quality + Item.QUALITY_GRANULARITY
        }
      }
    }
  }
}
