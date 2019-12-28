'use strict';
const Sequelize = require('../../config/database');
// const orders = Sequelize.import('./orders');
const products = Sequelize.import('./products');


module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define('OrderDetails', {
    Sequence: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // OrderId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   // references: {
    //   //   model: 'Orders',
    //   //   key: 'OrderId'
    //   // }
    // }
    // ,
    // ProductId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   // references: {
    //   //   model: 'Products',
    //   //   key: 'ProductId'
    //   // }
    // },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {timestamps: false});

  // OrderDetails.belongsTo(orders, {
  //   foreignKey: 'OrderId'
  // });
  OrderDetails.belongsTo(products, {
    foreignKey: 'ProductId'
  });

  return OrderDetails;
};