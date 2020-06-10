'use strict';
const Sequelize = require('../../config/database');
const Products = Sequelize.import('./products');


module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define('OrderDetails', {
    Sequence: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Quantity must be greater than zero'
        }
      }
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {timestamps: false});

  // Associations
  OrderDetails.belongsTo(Products, {
    foreignKey: 'ProductId'
  });

  return OrderDetails;
};