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
    update_item_quality(items[i]);
  }
}

function update_item_quality (item) {
    if (isNotAged(item) && isNotBackstage(item)) {
      decreaseQuality(item);
    } else {
      if (item.quality < Item.MAX_QUALITY) {
        item.quality = item.quality + Item.QUALITY_GRANULARITY;
        if (isBackstage(item)) {
          if (item.sell_in < Item.DOUBLE_THRESHOLD) {
            increaseQuality(item);
          }
          if (item.sell_in < Item.TRIPLE_THRESHOLD) {
            increaseQuality(item);
          }
        }
      }
    }
    if (isNotSulfuras(item)) {
      item.sell_in = item.sell_in - Item.SELLIN_GRANULARITY;
    }
    if (item.sell_in < Item.MIN_SELLIN) {
      if (isNotAged(item)) {
        if (isNotBackstage(item)) {
          decreaseQuality(item);
        } else {
          setQualityToZero(item);
        }
      } else {
        increaseQuality(item);
      }
    }

}

function increaseQuality (item) {
    if (item.quality < Item.MAX_QUALITY) {
      item.quality = item.quality + Item.QUALITY_GRANULARITY;
    }
}

function decreaseQuality (item) {
  if (item.quality > Item.MIN_QUALITY) {
    if (isNotSulfuras(item)) {
      item.quality = item.quality - Item.QUALITY_GRANULARITY
    }
  }
}

function setQualityToZero (item) {
  item.quality = item.quality - item.quality
}

function isNotAged (item) {
  return item.name != 'Aged Brie';
}

function isBackstage (item) {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

function isNotBackstage (item) {
  return ! isBackstage(item);
}

function isNotSulfuras (item) {
  return item.name != 'Sulfuras, Hand of Ragnaros';
}
