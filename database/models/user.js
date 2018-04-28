'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    address:  DataTypes.STRING,
    phone:  {
      type: DataTypes.STRING,
      unique: true
    },
    role: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
}