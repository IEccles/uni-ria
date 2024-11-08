'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Secateurs',
        productCategory: 'Tools',
        barcode: '1001010000',
        stockCount: 50,
        price:10.00
      },
      {
        name: 'Pruner',
        productCategory: 'Tools',
        barcode: '1002010000',
        stockCount: 50,
        price:23.00
      },
      {
        name: 'Rake',
        productCategory: 'Tools',
        barcode: '1003010000',
        stockCount: 50,
        price:15.00
      },
      {
        name: 'Hand Trowel',
        productCategory: 'Tools',
        barcode: '1004010000',
        stockCount: 50,
        price:11.50
      },
      {
        name: 'Yard Brush',
        productCategory: 'Tools',
        barcode: '1005010000',
        stockCount: 50,
        price:10.00
      },
      {
        name:'Shears',
        productCategory: 'Tools',
        barcode: '1006010000',
        stockCount:50,
        price:42.00
      },
      {
        name:'Grab-N-Lift',
        productCategory:'Tools',
        barcode:'1007010000',
        stockCount:50,
        price:17.00
      },
      {
        name:'Stainless Steel Border Fork',
        productCategory:'Tools',
        barcode:'1008010000',
        stockCount:50,
        price:38.00
      },
      {
        name:'Digging Spade',
        productCategory:'Tools',
        barcode:'1009010000',
        stockCount:50,
        price:38.00
      },
      {
        name:'Leaf Blower',
        productCategory:'Tools',
        barcode:'1010010000',
        stockCount:50,
        price:55.00
      },
      {
        name:'White Cosmos - Snow Puff',
        productCategory:'Seeds',
        barcode:'2001010000',
        stockCount:100,
        price:1.29
      },
      {
        name:'Cornflower - Blue Diadem',
        productCategory:'Seeds',
        barcode:'2002010000',
        stockCount:100,
        price:3.49
      },
      {
        name:'Swan Gourd',
        productCategory:'Seeds',
        barcode:'2003010000',
        stockCount:100,
        price:0.99
      },
      {
        name:'Bronze Dragon Antirrhium',
        productCategory:'Seeds',
        barcode:'2004010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Mixed Dahlias',
        productCategory:'Seeds',
        barcode:'2005010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Copper Swirl California Poppy',
        productCategory:'Seeds',
        barcode:'2006010000',
        stockCount:100,
        price:1.83
      },
      {
        name:'Majestic Double Marigold',
        productCategory:'Seeds',
        barcode:'2007010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Sunshot Gold Sunflower',
        productCategory:'Seeds',
        barcode:'2008010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Double Cascade Petunia',
        productCategory:'Seeds',
        barcode:'2009010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Avant-Garde Violet Laurentia',
        productCategory:'Seeds',
        barcode:'2010010000',
        stockCount:100,
        price:0.89
      },
      {
        name:'Single Egg Chair',
        productCategory:'Furniture',
        barcode:'3001010000',
        stockCount:5,
        price:399.00
      },
      {
        name:'Reclining Chair Set',
        productCategory:'Furniture',
        barcode:'3002010000',
        stockCount:5,
        price:799.00
      },
      {
        name:'Turin Bistro Set',
        productCategory:'Furniture',
        barcode:'3003010000',
        stockCount:5,
        price:399.00
      },
      {
        name:'Double Egg Chair',
        productCategory:'Furniture',
        barcode:'3004010000',
        stockCount:5,
        price:999.00
      },
      {
        name:'Bermuda Weave 4 Seat Set',
        productCategory:'Furniture',
        barcode:'3005010000',
        stockCount:5,
        price:799.00
      },
      {
        name:'Montego 6 Seat Set',
        productCategory:'Furniture',
        barcode:'3006010000',
        stockCount:5,
        price:1899.00
      },
      {
        name:'Lounger',
        productCategory:'Furniture',
        barcode:'3007010000',
        stockCount:5,
        price:699.00
      },
      {
        name:'Sienna Mini-Modular Seat Set',
        productCategory:'Furniture',
        barcode:'3008010000',
        stockCount:5,
        price:1399.00
      },
      {
        name:'Bermuda Corner Fire Pit Set',
        productCategory:'Furniture',
        barcode:'3009010000',
        stockCount:5,
        price:2399.00
      },
      {
        name:'Barcelona Lounge Set',
        productCategory:'Furniture',
        barcode:'3010010000',
        stockCount:5,
        price:1899.00
      },
      {
        name:'Lavendula',
        productCategory:'Plants',
        barcode:'4001010000',
        stockCount:15,
        price:14.00
      },
      {
        name:'Leylandi Excalibur Gold',
        productCategory:'Plants',
        barcode:'4002010000',
        stockCount:15,
        price:16.00
      },
      {
        name:'Magnolia Stellata',
        productCategory:'Plants',
        barcode:'4003010000',
        stockCount:15,
        price:28.00
      },
      {
        name:'White Viburnum',
        productCategory:'Plants',
        barcode:'4004010000',
        stockCount:15,
        price:14.00
      },
      {
        name:'Rosemary',
        productCategory:'Plants',
        barcode:'4005010000',
        stockCount:15,
        price:18.00
      },
      {
        name:'Hydrangea',
        productCategory:'Plants',
        barcode:'4006010000',
        stockCount:15,
        price:36.00
      },
      {
        name:'Pink Salvia Sensation',
        productCategory:'Plants',
        barcode:'4007010000',
        stockCount:15,
        price:11.00
      },
      {
        name:'Japanese Acer',
        productCategory:'Plants',
        barcode:'4008010000',
        stockCount:15,
        price:16.00
      },
      {
        name:'Sambucas Black Lace',
        productCategory:'Plants',
        barcode:'4009010000',
        stockCount:15,
        price:20.00
      },
      {
        name:'Pink - Purple Foxglove',
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
