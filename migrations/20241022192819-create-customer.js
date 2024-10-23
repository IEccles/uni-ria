'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER
      },
      firstName: {
          allowNull:false,
          type:Sequelize.STRING
      },
      surname:{
          allowNull:false,
          type:Sequelize.STRING
      },
      email:{
          allowNull:false,
          unique:true, 
          type:Sequelize.STRING
      },
      mobile:{
        allowNull:false,
        type:Sequelize.STRING
      },
      homePhone:{
        allowNull:true,
        type:Sequelize.STRING
      },
      addressLine1:{
        allowNull:false,
        type:Sequelize.STRING
      },
      addressLine2:{
        allowNull:true,
        type:Sequelize.STRING
      },
      county:{
        allowNull:false,
        type:Sequelize.STRING
      },
      postCode:{
        allowNull:false,
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull:false,
        type:Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      lastOrderedDate:{
        allowNull:true,
        type:Sequelize.DATE
      },
      membershipStatus:{
        allowNull:false,
        type:Sequelize.BOOLEAN
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers')
  }
};
