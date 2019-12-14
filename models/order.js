'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    OrderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'UserId',
      }
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: ' true',
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, { freezeTableName: true });
  Order.associate = function (models) {
    // associations can be defined here
  };
  return Order;
};