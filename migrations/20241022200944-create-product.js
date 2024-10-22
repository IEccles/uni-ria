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
      name:{
        allowNull:false,
        type:sequelize.STRING
      },
      stockCode:{
        allowNull:false, 
        type:sequelize.NUMBER
      },
      productCategory:{
        allowNull:false,
        type:sequelize.STRING
      },
      barcode:{
        allowNull:false,
        type:sequelize.STRING
      },
      stockCount:{
        allowNull:false,
        type:sequelize.NUMBER
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders')
  }
};
