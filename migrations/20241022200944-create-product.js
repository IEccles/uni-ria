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
      name:{
        allowNull:false,
        type:Sequelize.STRING
      },
      stockCode:{
        allowNull:false, 
        type:Sequelize.NUMBER
      },
      productCategory:{
        allowNull:false,
        type:Sequelize.STRING
      },
      barcode:{
        allowNull:false,
        type:Sequelize.STRING
      },
      stockCount:{
        allowNull:false,
        type:Sequelize.NUMBER
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders')
  }
};
