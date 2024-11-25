const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Define the base path for your images
    const imageBasePath = path.resolve(__dirname, 'images');

    // Helper function to read and convert an image to a Blob
    const getImageBlob = (fileName) => {
      const filePath = path.join(imageBasePath, fileName);

      // Ensure the file exists before trying to read it
      if (!fs.existsSync(filePath)) {
        throw new Error(`Image file not found: ${filePath}`);
      }

      // Read the file and return it as a Buffer
      return fs.readFileSync(filePath);
    };

    try {
      // Add your products with images converted to Blob (Buffer)
      await queryInterface.bulkInsert('Products', [
      {
        name: 'Secateurs',
        productCategory: 'Tools',
        barcode: '1001010000',
        stockCount: 50,
        price:10.00,
        image:getImageBlob('Secateurs.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pruner',
        productCategory: 'Tools',
        barcode: '1002010000',
        stockCount: 50,
        price:23.00,
        image: getImageBlob('Pruners.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rake',
        productCategory: 'Tools',
        barcode: '1003010000',
        stockCount: 50,
        price:15.00,
        image: getImageBlob('Rake.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hand Trowel',
        productCategory: 'Tools',
        barcode: '1004010000',
        stockCount: 50,
        price:11.50,
        image: getImageBlob('HandTrowel.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yard Brush',
        productCategory: 'Tools',
        barcode: '1005010000',
        stockCount: 50,
        price:10.00,
        image: getImageBlob('YardBrush.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Shears',
        productCategory: 'Tools',
        barcode: '1006010000',
        stockCount:50,
        price:42.00,
        image: getImageBlob('Shears.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Grab-N-Lift',
        productCategory:'Tools',
        barcode:'1007010000',
        stockCount:50,
        price:17.00,
        image: getImageBlob('GrabNLift.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Stainless Steel Border Fork',
        productCategory:'Tools',
        barcode:'1008010000',
        stockCount:50,
        price:38.00,
        image: getImageBlob('BorderFork.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Digging Spade',
        productCategory:'Tools',
        barcode:'1009010000',
        stockCount:50,
        price:38.00,
        image: getImageBlob('DiggingSpade.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Leaf Blower',
        productCategory:'Tools',
        barcode:'1010010000',
        stockCount:50,
        price:55.00,
        image: getImageBlob('LeafBlower.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'White Cosmos - Snow Puff',
        productCategory:'Seeds',
        barcode:'2001010000',
        stockCount:100,
        price:1.29,
        image: getImageBlob('WhiteCosmos.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Cornflower - Blue Diadem',
        productCategory:'Seeds',
        barcode:'2002010000',
        stockCount:100,
        price:3.49,
        image: getImageBlob('CornflowerBlueDiadem.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Swan Gourd',
        productCategory:'Seeds',
        barcode:'2003010000',
        stockCount:100,
        price:0.99,
        image: getImageBlob('SwanGourd.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Bronze Dragon Antirrhium',
        productCategory:'Seeds',
        barcode:'2004010000',
        stockCount:100,
        price:0.89,
        image: getImageBlob('BronzeDragonAntirrhium.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Mixed Dahlias',
        productCategory:'Seeds',
        barcode:'2005010000',
        stockCount:100,
        price:0.89,
        image: getImageBlob('MixedDahlias.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Copper Swirl California Poppy',
        productCategory:'Seeds',
        barcode:'2006010000',
        stockCount:100,
        price:1.83,
        image: getImageBlob('CopperSwirlPoppy.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Majestic Double Marigold',
        productCategory:'Seeds',
        barcode:'2007010000',
        stockCount:100,
        price:0.89,
        image: getImageBlob('DoubleMarigold.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Sunshot Gold Sunflower',
        productCategory:'Seeds',
        barcode:'2008010000',
        stockCount:100,
        price:0.89,
        image: getImageBlob('SunshotGoldSunflower.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Double Cascade Petunia',
        productCategory:'Seeds',
        barcode:'2009010000',
        stockCount:100,
        price:0.89,
        image: getImageBlob('DoubleCascadePetunia.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Avant-Garde Violet Laurentia',
        productCategory:'Seeds',
        barcode:'2010010000',
        stockCount:100,
        price:0.89,
        image: getImageBlob('AvantGardeLaurentia.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Single Egg Chair',
        productCategory:'Furniture',
        barcode:'3001010000',
        stockCount:5,
        price:399.00,
        image: getImageBlob('SingleEggChair.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Reclining Chair Set',
        productCategory:'Furniture',
        barcode:'3002010000',
        stockCount:5,
        price:799.00,
        image: getImageBlob('RecliningChairSet.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Turin Bistro Set',
        productCategory:'Furniture',
        barcode:'3003010000',
        stockCount:5,
        price:399.00,
        image: getImageBlob('TurinBistroSet.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Double Egg Chair',
        productCategory:'Furniture',
        barcode:'3004010000',
        stockCount:5,
        price:999.00,
        image: getImageBlob('DoubleEggChair.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Bermuda Weave 4 Seat Set',
        productCategory:'Furniture',
        barcode:'3005010000',
        stockCount:5,
        price:799.00,
        image: getImageBlob('BermudaWeave4SeatSet.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Montego 6 Seat Set',
        productCategory:'Furniture',
        barcode:'3006010000',
        stockCount:5,
        price:1899.00,
        image: getImageBlob('Montego6SeatSet.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Lounger',
        productCategory:'Furniture',
        barcode:'3007010000',
        stockCount:5,
        price:699.00,
        image: getImageBlob('Lounger.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Sienna Mini-Modular Seat Set',
        productCategory:'Furniture',
        barcode:'3008010000',
        stockCount:5,
        price:1399.00,
        image: getImageBlob('SienneMiniModularSet.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Bermuda Corner Fire Pit Set',
        productCategory:'Furniture',
        barcode:'3009010000',
        stockCount:5,
        price:2399.00,
        image: getImageBlob('BermudaCornerFirePitSet.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Barcelona Lounge Set',
        productCategory:'Furniture',
        barcode:'3010010000',
        stockCount:5,
        price:1899.00,
        image: getImageBlob('BarcelonaLoungeSet.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Lavandula',
        productCategory:'Plants',
        barcode:'4001010000',
        stockCount:15,
        price:14.00,
        image: getImageBlob('Lavandula.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Leylandi Excalibur Gold',
        productCategory:'Plants',
        barcode:'4002010000',
        stockCount:15,
        price:16.00,
        image: getImageBlob('Leylandi.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Magnolia Stellata',
        productCategory:'Plants',
        barcode:'4003010000',
        stockCount:15,
        price:28.00,
        image: getImageBlob('MagnoliaStellata.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'White Viburnum',
        productCategory:'Plants',
        barcode:'4004010000',
        stockCount:15,
        price:14.00,
        image: getImageBlob('WhiteViburnum.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Rosemary',
        productCategory:'Plants',
        barcode:'4005010000',
        stockCount:15,
        price:18.00,
        image: getImageBlob('Rosemary.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Hydrangea',
        productCategory:'Plants',
        barcode:'4006010000',
        stockCount:15,
        price:36.00,
        image: getImageBlob('Hydrangea.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Pink Salvia Sensation',
        productCategory:'Plants',
        barcode:'4007010000',
        stockCount:15,
        price:11.00,
        image: getImageBlob('PinkSalvia.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Japanese Acer',
        productCategory:'Plants',
        barcode:'4008010000',
        stockCount:15,
        price:16.00,
        image: getImageBlob('JapaneseAcer.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Sambucas Black Lace',
        productCategory:'Plants',
        barcode:'4009010000',
        stockCount:15,
        price:20.00,
        image: getImageBlob('SambucasBlackLace.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Pink - Purple Foxglove',
        productCategory:'Plants',
        barcode:'4010010000',
        stockCount:15,
        price:12.00,
        image: getImageBlob('PinkPurpleFoxglove.PNG'),
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
        console.log('Seed data inserted successfully!');
          } catch (error) {
          console.error('Error inserting seed data:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove seeded data
    await queryInterface.bulkDelete('Products', null, {});
  },
};
