'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      firstName: {
          allowNull:false,
          type:sequelize.STRING
      },
      surname:{
          allowNull:false,
          type:sequelize.STRING
      },
      email:{
          allowNull:false,
          primaryKey:true, 
          type:sequelize.STRING
      },
      password:{
        allowNull:false,
        type:sequelize.STRING
      },
      mobile:{
        allowNull:false,
        type:sequelize.STRING
      },
      homePhone:{
        allowNull:true,
        type:sequelize.STRING
      },
      addressLine1:{
        allowNull:false,
        type:sequelize.STRING
      },
      addressLine2:{
        allowNull:true,
        type:sequelize.STRING
      },
      county:{
        allowNull:false,
        type:sequelize.STRING
      },
      postCode:{
        allowNull:false,
        type:sequelize.STRING
      },
      createdAt: {
        allowNull:false,
        type:sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE
      },
      lastOrderedDate:{
        allowNull:true,
        type:sequelize.DATE
      },
      membershipStatus:{
        allowNull:false,
        type:sequelize.BOOLEAN
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers')
  }
};
