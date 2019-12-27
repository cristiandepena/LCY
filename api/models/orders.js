'use strict';
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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false ,
      references: {
        model: 'Users',
        key: 'UserId',
      }
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
  Order.associate = function (models) {
    // associations can be defined here
  };
  return Order;
};