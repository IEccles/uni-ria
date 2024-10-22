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
          type:sequelize.INTEGER
      },
      orderId:{
        allowNull:false,
        type:sequelize.NUMBER
      },
      customerId:{
        allowNull:false, 
        type:sequelize.NUMBER
      },
      productId:{
        allowNull:false,
        type:sequelize.NUMBER
      },
      shippingDate:{
        allowNull:false,
        type:sequelize.DATE
      },
      trackingNumber:{
        allowNull:false,
        type:sequelize.STRING
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders')
  }
};
