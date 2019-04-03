'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('flowers', [{
      type: 'jury', price: 30, information: "red",
      store_id: 1,
      image: "",
      created_at: new Date(), updated_at: new Date()
    }], {});
  },

  down: function down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete('flowers', null, {});
  }
};