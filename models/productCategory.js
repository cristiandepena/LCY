const sequelize = require('sequelize');
const db = require('../config/database');

const category = db.define('ProductCategory', {
  category_id: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: sequelize.STRING,
    allowNull: false
  },
  active: {
    type: sequelize.BOOLEAN,
    allowNull: false
  },
  CreatedBy: {
    type: sequelize.SMALLINT,
    allowNull: false
  }

}, { timestamps: true });

module.exports = product;
