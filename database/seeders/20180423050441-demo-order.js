const chance = require('chance').Chance();
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let save = [];
    for (let i=0; i< 10; i++) {
     save.push({ 
      user_id: chance.integer({min: 0, max: 100}),
      createdAt: new Date(),
      updatedAt: new Date()
     }) 
    }  
    return queryInterface.bulkInsert('Orders', save, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
  
};
