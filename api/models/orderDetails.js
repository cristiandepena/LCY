'use strict';
const Sequelize = require('../../config/database');
const products = Sequelize.import('./products');


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
      allowNull: false
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {timestamps: false});

  // Associations
  OrderDetails.belongsTo(products, {
    foreignKey: 'ProductId'
  });

  return OrderDetails;
};