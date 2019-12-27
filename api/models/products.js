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
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: {
          args: [10, 200],
          msg: 'Description: requires a min of 10 to 200 characters'
        }
      }
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ProductCategories',
        key: 'CategoryId',
        onDelete: 'CASCADE'
      }
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

  return Product;
};