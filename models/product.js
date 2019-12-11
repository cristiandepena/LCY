'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
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
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 'true'
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};