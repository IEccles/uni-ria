'use strict';

const { DeviceRequestPrompt } = require('puppeteer');
const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
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
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders')
  }
};
