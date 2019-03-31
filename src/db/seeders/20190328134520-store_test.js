'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stores', [
    
      {store_name: 'Zohor', phone: '4354433',location: "Ryiadh",email:"alyahadiem@gmail.com",created_at: new Date, updated_at: new Date},
   
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stores', null, {});
  }
};
