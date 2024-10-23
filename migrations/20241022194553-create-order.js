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
      orderNumber:{
        allowNull:false,
        type:Sequelize.NUMBER
      },
      customerId:{
        allowNull:false, 
        type:Sequelize.NUMBER
      },
      total:{
        allowNull:false,
        type:Sequelize.FLOAT
      },
      deliveryDate:{
        allowNull:false,
        type:Sequelize.DATE
      },
      timeSlot:{
        allowNull:false,
        type:Sequelize.DATE
      },
      createdAt:{
        allowNull:false,
        type:Sequelize.DATE
      },
      updatedAt:{
        allowNull:false,
        type:Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders')
  }
};
