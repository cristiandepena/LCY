'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    CreatedBy: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};