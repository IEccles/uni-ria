'use strict';

const { DeviceRequestPrompt } = require('puppeteer');
const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders-items', {
      id: {
          allowNull:false,
          autoIncrement:true,
          primaryKey:true,
          type:Sequelize.INTEGER
      },
      orderId:{
        allowNull:false,
        type:Sequelize.NUMBER
      },
      customerId:{
        allowNull:false, 
        type:Sequelize.NUMBER
      },
      productId:{
        allowNull:false,
        type:Sequelize.NUMBER
      },
      shippingDate:{
        allowNull:false,
        type:Sequelize.DATE
      },
      trackingNumber:{
        allowNull:false,
        type:Sequelize.STRING
      , createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }}
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Order-items')
  }
};
