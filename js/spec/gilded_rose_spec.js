describe("Gilded Rose updates", function() {

  it("should decrease quality", function() {
    console.log(items);
    items = [ new Item("General object", 1, 1) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  it("should decrease sell in", function() {
    items = [ new Item("General object", 1, 1) ];
    update_quality();
    expect(items[0].sell_in).toEqual(0);
  });

  it("should decrease twice as fast once the sell date passed", function() {
    items = [ new Item("General object", 0, 2) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  it("should never decrease quality to a negative value", function () {
    items = [ new Item("General object", 0, 0) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  describe("Backstage passes to a TAFKAL80ETC concert", function () {
    it("should increase its quality by 1", function () {
      items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 2) ];
      update_quality();
      expect(items[0].quality).toEqual(3);
    });

    it('should drops to 0 after the concert', function () {
      items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50) ];
      update_quality();
      expect(items[0].quality).toEqual(0);
    });

    it("should keep quality at 50 tops", function() {
      items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50) ];
      update_quality();
      expect(items[0].quality).toEqual(50);
  });

    describe('with sell in les or equal to 10', function () {
      it("should increase its quality by 2", function () {
        items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2) ];
        update_quality();
        expect(items[0].quality).toEqual(4);
      });
    });

    describe('with sell in is less or equal to 5', function () {
      it("should increase by 3 when sell in is less or equal to 5", function () {
          items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2) ];
          update_quality();
          expect(items[0].quality).toEqual(5);
      });
    });
  });

  describe('Aged Brie', function() {
    it("should keep quality at 50 tops", function() {
        items = [ new Item("Aged Brie", 10, 50) ];
        update_quality();
        expect(items[0].quality).toEqual(50);
    });

    it("should increase quality", function() {
        items = [ new Item("Aged Brie", 10, 10) ];
        update_quality();
        expect(items[0].quality).toEqual(11);
    });
  });


  describe('Sulfuras', function () {
    beforeEach(function () {
      items = [ new Item("Sulfuras, Hand of Ragnaros", 10, 50) ];
    });

    it('should never decrease quality', function () {
      update_quality();
      expect(items[0].quality).toEqual(50);
    });

    it('should never decrease sellin', function () {
      update_quality();
      expect(items[0].sell_in).toEqual(10);
    });
  });



});

