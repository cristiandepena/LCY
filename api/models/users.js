'use strict';
const Sequelize = require('../../config/database');
const Orders = Sequelize.import('./orders');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users', {
      UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      FirstName: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      LastName: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      Password: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {});

  // Associations
  User.hasMany(Orders, {
    foreignKey: 'UserId'
  });

  return User;
};