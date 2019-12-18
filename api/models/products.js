'use strict';
const database = require('../../config/database');
// const ProductCategory = database.import('./productCategories');

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
      references: {
        model: 'ProductCategories',
        key: 'CategoryId'
      }
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

  // associations can be defined here
  // Product.belongsTo(ProductCategory, {foreignKey: 'CategoryId'});


  return Product;
};