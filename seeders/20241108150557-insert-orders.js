'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        customerId: 1,
        total: 43.00,
        deliveryDate: new Date('2024-11-25'),
        timeSlot: new Date('2024-11-25T09:00:00'), // 9:00 AM start time
        products: JSON.stringify([{ productId: 1, itemQuantity: 2 }, { productId: 2, itemQuantity: 1 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 1,
        total: 28.00,
        deliveryDate: new Date('2024-12-02'),
        timeSlot: new Date('2024-12-02T14:00:00'), // 2:00 PM start time
        products: JSON.stringify([{ productId: 3, itemQuantity: 1 }, { productId: 4, itemQuantity: 2 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 2,
        total: 72.00,
        deliveryDate: new Date('2024-11-26'),
        timeSlot: new Date('2024-11-26T13:00:00'), // 1:00 PM start time
        products: JSON.stringify([{ productId: 5, itemQuantity: 3 }, { productId: 6, itemQuantity: 1 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 2,
        total: 23.98,
        deliveryDate: new Date('2024-12-03'),
        timeSlot: new Date('2024-12-03T11:00:00'), // 11:00 AM start time
        products: JSON.stringify([{ productId: 12, itemQuantity: 2 }, { productId: 7, itemQuantity: 1 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 3,
        total: 175.00,
        deliveryDate: new Date('2024-11-27'),
        timeSlot: new Date('2024-11-27T10:00:00'), // 10:00 AM start time
        products: JSON.stringify([{ productId: 4, itemQuantity: 1 }, { productId: 16, itemQuantity: 20 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 3,
        total: 120.00,
        deliveryDate: new Date('2024-12-04'),
        timeSlot: new Date('2024-12-04T15:00:00'), // 3:00 PM start time
        products: JSON.stringify([{ productId: 16, itemQuantity: 17 }, { productId: 34, itemQuantity: 45 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 4,
        total: 90.00,
        deliveryDate: new Date('2024-12-01'),
        timeSlot: new Date('2024-12-01T09:00:00'), // 9:00 AM start time
        products: JSON.stringify([{ productId: 5, itemQuantity: 14 }, { productId: 38, itemQuantity: 46 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 4,
        total: 115.00,
        deliveryDate: new Date('2024-12-08'),
        timeSlot: new Date('2024-12-08T16:00:00'), // 4:00 PM start time
        products: JSON.stringify([{ productId: 8, itemQuantity: 14 }, { productId: 38, itemQuantity: 45 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 5,
        total: 130.00,
        deliveryDate: new Date('2024-11-30'),
        timeSlot: new Date('2024-11-30T13:00:00'), // 1:00 PM start time
        products: JSON.stringify([{ productId: 2, itemQuantity: 16 }, { productId: 21, itemQuantity: 23 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 5,
        total: 95.00,
        deliveryDate: new Date('2024-12-06'),
        timeSlot: new Date('2024-12-06T10:00:00'), // 10:00 AM start time
        products: JSON.stringify([{ productId: 4, itemQuantity: 17 }, { productId: 27, itemQuantity: 38 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 6,
        total: 150.00,
        deliveryDate: new Date('2024-11-25'),
        timeSlot: new Date('2024-11-25T09:00:00'), // 9:00 AM start time
        products: JSON.stringify([{ productId: 26, itemQuantity: 33 }, { productId: 36, itemQuantity: 37 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 6,
        total: 75.50,
        deliveryDate: new Date('2024-12-01'),
        timeSlot: new Date('2024-12-01T14:00:00'), // 2:00 PM start time
        products: JSON.stringify([{ productId: 19, itemQuantity: 10 }, { productId: 23, itemQuantity: 5 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 7,
        total: 88.75,
        deliveryDate: new Date('2024-12-02'),
        timeSlot: new Date('2024-12-02T11:00:00'), // 11:00 AM start time
        products: JSON.stringify([{ productId: 15, itemQuantity: 3 }, { productId: 17, itemQuantity: 12 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 7,
        total: 52.00,
        deliveryDate: new Date('2024-12-09'),
        timeSlot: new Date('2024-12-09T10:00:00'), // 10:00 AM start time
        products: JSON.stringify([{ productId: 7, itemQuantity: 6 }, { productId: 22, itemQuantity: 3 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 8,
        total: 63.50,
        deliveryDate: new Date('2024-11-28'),
        timeSlot: new Date('2024-11-28T16:00:00'), // 4:00 PM start time
        products: JSON.stringify([{ productId: 9, itemQuantity: 8 }, { productId: 25, itemQuantity: 2 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 8,
        total: 47.25,
        deliveryDate: new Date('2024-12-05'),
        timeSlot: new Date('2024-12-05T15:00:00'), // 3:00 PM start time
        products: JSON.stringify([{ productId: 11, itemQuantity: 1 }, { productId: 29, itemQuantity: 9 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 9,
        total: 135.00,
        deliveryDate: new Date('2024-11-29'),
        timeSlot: new Date('2024-11-29T09:00:00'), // 9:00 AM start time
        products: JSON.stringify([{ productId: 14, itemQuantity: 12 }, { productId: 24, itemQuantity: 15 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 9,
        total: 92.50,
        deliveryDate: new Date('2024-12-07'),
        timeSlot: new Date('2024-12-07T14:00:00'), // 2:00 PM start time
        products: JSON.stringify([{ productId: 20, itemQuantity: 5 }, { productId: 28, itemQuantity: 7 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 10,
        total: 160.00,
        deliveryDate: new Date('2024-11-30'),
        timeSlot: new Date('2024-11-30T11:00:00'), // 11:00 AM start time
        products: JSON.stringify([{ productId: 6, itemQuantity: 14 }, { productId: 10, itemQuantity: 20 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 10,
        total: 180.00,
        deliveryDate: new Date('2024-12-10'),
        timeSlot: new Date('2024-12-10T15:00:00'), // 3:00 PM start time
        products: JSON.stringify([{ productId: 18, itemQuantity: 9 }, { productId: 30, itemQuantity: 25 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
