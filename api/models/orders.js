'use strict';
const Sequelize = require('../../config/database');
const orderDetails = Sequelize.import('./orderDetails');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Orders', {
    OrderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    isProcessed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  // Associations
  Order.hasMany(orderDetails, {
    foreignKey: {name: 'OrderId', allowNull: false}
  });

  return Order;
};