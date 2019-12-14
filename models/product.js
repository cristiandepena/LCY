'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Stock: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
  });
  Product.associate = function (models) {
    // associations can be defined here
    models.Product.hasOne();
  };
  return Product;
};