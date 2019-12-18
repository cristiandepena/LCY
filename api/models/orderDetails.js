'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define('OrderDetails', {
    Sequence: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'ProductId'
      }
    },
    ProductCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductPrice: {
      type: DataTypes.float,
      allowNull: false
    }
  });
  OrderDetails.associate = function (models) {
    // associations can be defined here
  };
  return OrderDetails;
};