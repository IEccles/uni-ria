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
      orderNumber:{
        allowNull:false,
        type:sequelize.NUMBER
      },
      customerId:{
        allowNull:false, 
        type:sequelize.NUMBER
      },
      total:{
        allowNull:false,
        type:sequelize.DECIMAL
      },
      deliveryDate:{
        allowNull:false,
        type:sequelize.DATE
      },
      timeSlot:{
        allowNull:false,
        type:sequelize.DATE
      },
      createdAt:{
        allowNull:false,
        type:sequelize.DATE
      },
      updatedAt:{
        allowNull:false,
        type:sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders')
  }
};
