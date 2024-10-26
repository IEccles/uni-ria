'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Secateurs',
        stockCode: 1001,
        productCategory: 'Tools',
        barcode: '1001010000',
        stockCount: 50,
        price:10.00
      },
      {
        name: 'Pruner',
        stockCode: 1002,
        productCategory: 'Tools',
        barcode: '1002010000',
        stockCount: 50,
        price:23.00
      },
      {
        name: 'Rake',
        stockCode: 1003,
        productCategory: 'Tools',
        barcode: '1003010000',
        stockCount: 50,
        price:15.00
      },
      {
        name: 'Hand Trowel',
        stockCode: 1004,
        productCategory: 'Tools',
        barcode: '1004010000',
        stockCount: 50,
        price:11.50
      },
      {
        name: 'Yard Brush',
        stockCode: 1005,
        productCategory: 'Tools',
        barcode: '1005010000',
        stockCount: 50,
        price:10.00
      },
      {
        name:'Shears',
        stockCode:1006,
        productCategory: 'Tools',
        barcode: '1006010000',
        stockCount:50,
        price:42.00
      },
      {
        name:'Grab-N-Lift',
        stockCode:1007,
        productCategory:'Tools',
        barcode:'1007010000',
        stockCount:50,
        price:17.00
      },
      {
        name:'Stainless Steel Border Fork',
        stockCode:1008,
        productCategory:'Tools',
        barcode:'1008010000',
        stockCount:50,
        price:38.00
      },
      {
        name:'Digging Spade',
        stockCode:1009,
        productCategory:'Tools',
        barcode:'1009010000',
        stockCount:50,
        price:38.00
      },
      {
        name:'Leaf Blower',
        stockCode:1010,
        productCategory:'Tools',
        barcode:'1010010000',
        stockCount:50,
        price:55.00
      },
      {
        name:'White Cosmos - Snow Puff',
        stockCode:2001,
        productCategory:'Seeds',
        barcode:'2001010000',
        stockCount:100,
        price:1.29
      },
      {
        name:'Cornflower - Blue Diadem',
        stockCode:2002,
        productCategory:'Seeds',
        barcode:'2002010000',
        stockCount:100,
        price:3.49
      },
      {
        name:'Swan Gourd',
        stockCode:2003,
        productCategory:'Seeds',
        barcode:'2003010000',
        stockCount:100,
        price:0.99
      },
      {
        name:'Bronze Dragon Antirrhium',
        stockCode:2004,
        productCategory:'Seeds',
        barcode:'2004010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Mixed Dahlias',
        stockCode:2005,
        productCategory:'Seeds',
        barcode:'2005010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Copper Swirl California Poppy',
        stockCode:2006,
        productCategory:'Seeds',
        barcode:'2006010000',
        stockCount:100,
        price:1.83
      },
      {
        name:'Majestic Double Marigold',
        stockCode:2007,
        productCategory:'Seeds',
        barcode:'2007010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Sunshot Gold Sunflower',
        stockCode:2008,
        productCategory:'Seeds',
        barcode:'2008010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Double Cascade Petunia',
        stockCode:2009,
        productCategory:'Seeds',
        barcode:'2009010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Avant-Garde Violet Laurentia',
        stockCode:2010,
        productCategory:'Seeds',
        barcode:'2010010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Single Egg Chair',
        stockCode:3001,
        productCategory:'Furniture',
        barcode:'3001010000',
        stockCount:5,
        price:399.00
      },
      {
        name:'Reclining Chair Set',
        stockCode:3002,
        productCategory:'Furniture',
        barcode:'3002010000',
        stockCount:5,
        price:799.00
      },
      {
        name:'Turin Bistro Set',
        stockCode:3003,
        productCategory:'Furniture',
        barcode:'3003010000',
        stockCount:5,
        price:399.00
      },
      {
        name:'Double Egg Chair',
        stockCode:3004,
        productCategory:'Furniture',
        barcode:'3004010000',
        stockCount:5,
        price:999.00
      },
      {
        name:'Bermuda Weave 4 Seat Set',
        stockCode:3005,
        productCategory:'Furniture',
        barcode:'3005010000',
        stockCount:5,
        price:799.00
      },
      {
        name:'Montego 6 Seat Set',
        stockCode:3006,
        productCategory:'Furniture',
        barcode:'3006010000',
        stockCount:5,
        price:1899.00
      },
      {
        name:'Lounger',
        stockCode:3007,
        productCategory:'Furniture',
        barcode:'3007010000',
        stockCount:5,
        price:699.00
      },
      {
        name:'Sienna Mini-Modular Seat Set',
        stockCode:3008,
        productCategory:'Furniture',
        barcode:'3008010000',
        stockCount:5,
        price:1399.00
      },
      {
        name:'Bermuda Corner Fire Pit Set',
        stockCode:3009,
        productCategory:'Furniture',
        barcode:'3009010000',
        stockCount:5,
        price:2399.00
      },
      {
        name:'Barcelona Lounge Set',
        stockCode:3010,
        productCategory:'Furniture',
        barcode:'3010010000',
        stockCount:5,
        price:1899.00
      },
      {
        name:'Lavendula',
        stockCode:4001,
        productCategory:'Plants',
        barcode:'4001010000',
        stockCount:15,
        price:14.00
      },
      {
        name:'Leylandi Excalibur Gold',
        stockCode:4002,
        productCategory:'Plants',
        barcode:'4002010000',
        stockCount:15,
        price:16.00
      },
      {
        name:'Magnolia Stellata',
        stockCode:4003,
        productCategory:'Plants',
        barcode:'4003010000',
        stockCount:15,
        price:28.00
      },
      {
        name:'White Viburnum',
        stockCode:4004,
        productCategory:'Plants',
        barcode:'4004010000',
        stockCount:15,
        price:14.00
      },
      {
        name:'Rosemary',
        stockCode:4005,
        productCategory:'Plants',
        barcode:'4005010000',
        stockCount:15,
        price:18.00
      },
      {
        name:'Hydrangea',
        stockCode:4006,
        productCategory:'Plants',
        barcode:'4006010000',
        stockCount:15,
        price:36.00
      },
      {
        name:'Pink Salvia Sensation',
        stockCode:4007,
        productCategory:'Plants',
        barcode:'4007010000',
        stockCount:15,
        price:11.00
      },
      {
        name:'Japanese Acer',
        stockCode:4008,
        productCategory:'Plants',
        barcode:'4008010000',
        stockCount:15,
        price:16.00
      },
      {
        name:'Sambucas Black Lace',
        stockCode:4009,
        productCategory:'Plants',
        barcode:'4009010000',
        stockCount:15,
        price:20.00
      },
      {
        name:'Pink - Purple Foxglove',
        stockCode:4010,
        productCategory:'Plants',
        barcode:'4010010000',
        stockCount:15,
        price:12.00
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
