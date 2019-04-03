'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{ email: 'alyahdiem@gmail.com', hashed_password: "4323rfc", type: "florist", created_at: new Date(), updated_at: new Date() }], {});
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};