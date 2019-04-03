'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('flowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      information: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      
      storeId:{
        field: "store_id", 
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "stores",
        }
      }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('flowers');
  }
};