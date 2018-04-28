const chance = require('chance').Chance();
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let save = [];
    for (let i=0; i< 10; i++) {
     save.push({ 
      user_id: chance.integer({min: 1, max: 100}),
      order_id: chance.integer({min: 1, max: 100}),
      product_id: chance.integer({min: 1, max: 100}),
      quantity: chance.integer({min: 1, max: 100}),
      createdAt: new Date(),
      updatedAt: new Date()
     }) 
    }  
    return queryInterface.bulkInsert('Order_details', save, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Order_details', null, {});
  }
};
