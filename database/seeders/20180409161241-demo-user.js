var chance = require('chance').Chance();
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let save = [];
    for (let i=0; i< 30; i++) {
     save.push( { 
      firstName: chance.first(),
      lastName: chance.last(),
      username: chance.string({length: 8}),
      password: chance.string({length: 10}),
      token: chance.string({length: 10}),
      email: chance.email(),
      address: chance.address(),
      phone: chance.phone(),
      createdAt: new Date(),
      updatedAt: new Date()
     }) 
    }  
    return queryInterface.bulkInsert('Users', save, {});
},

down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('Users', null, {});
  } 
};
