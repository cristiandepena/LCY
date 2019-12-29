'use strict';

module.exports = (sequelize, DataTypes) => {
  const productCategory = sequelize.define('ProductCategories', {
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [10, 200],
          msg: 'Description: requires a min of 10 to 100 characters'
        }
      }
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  return productCategory;
};