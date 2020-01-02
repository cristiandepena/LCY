'use strict';
const Sequelize = require('../../config/database');
const productCategories = Sequelize.import('./productCategories');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: {
          args: [5, 200],
          msg: 'Description: requires a min of 5 to 200 characters'
        }
      }
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});

  // Associatons
  Product.belongsTo(productCategories, { 
    foreignKey: 'CategoryId',
  });

  return Product;
};