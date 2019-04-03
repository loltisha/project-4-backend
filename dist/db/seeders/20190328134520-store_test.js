'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('stores', [{ store_name: 'Zohor', phone: '4354433', location: "Ryiadh", email: "alyahadiem@gmail.com",
      image: "",
      created_at: new Date(), updated_at: new Date(), user_id: 1 }], {});
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('stores', null, {});
  }
};