'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
    
      {email: 'alyahdiem@gmail.com',hashed_password: "4323rfc",type:"owner",created_at: new Date, updated_at: new Date},
   
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});

  }
};
