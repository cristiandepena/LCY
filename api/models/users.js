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
        allowNull: false,
        validate: {
          len: {
            args: [3, 200],
            msg: 'First Name must be from min of 3 to 200 characters'
          }
        }
      },
      LastName: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: {
            args: [2, 200],
            msg: 'Last Name must be from min of 2 to 200 characters'
          }
        }
      },
      Email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          isEmail: {
            args: [''],
            msg: 'Invalid email address'
          }
        }
      },
      Password: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: {
            args: [8, 30],
            msg: 'Password must be from a min of 8 to 30 characters'
          }
        }
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