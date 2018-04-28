const chance = require('chance').Chance();
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let save = [];
    for (let i=0; i< 10; i++) {
     save.push({ 
      product_name: chance.word(),
      stock: chance.integer({min: 1, max: 1000}),
      price: chance.integer({min: 1000, max: 100000}),
      transactions: chance.integer({min: 0, max: 100}),
      createdAt: new Date(),
      updatedAt: new Date()
     }) 
    }  
    return queryInterface.bulkInsert('Products', save, {});
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
