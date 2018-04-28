'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order_details = sequelize.define('Order_details', {
    user_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  Order_details.associate = function(models) {
    // associations can be defined here
  };
  return Order_details;
};