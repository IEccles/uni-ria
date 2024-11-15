'use strict';

const { DeviceRequestPrompt } = require('puppeteer');
const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
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
      description: {
        allowNull: true,
        type: Sequelize.STRING
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
      },
      price:{
        allowNull:false,
        type:sequelize.FLOAT
      },
      image: {
        allowNull: true,
        type: Sequelize.BLOB('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Products')
  }
};
