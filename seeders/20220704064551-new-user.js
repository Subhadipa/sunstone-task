'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', 
    [
      {
      name: 'John Doe',
      email: 'example@example.com',
      password:'jdoe123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'John Doe1',
      email: 'example1@example.com',
      password:'jdoe1234',
      createdAt: new Date(),
      updatedAt: new Date()
    },

  
    ]);
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
