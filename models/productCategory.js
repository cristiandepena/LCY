'use strict';
module.exports = (sequelize, DataTypes) => {
  const productCategory = sequelize.define('ProductCategory', {
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {});
  productCategory.associate = function (models) {
    // associations can be defined here
    productCategory.hasOne(models.Product);
  };
  return productCategory;
};