const database = require('../config/database');
const Category = database.import('../models/productCategory');

// Get all products
const getCategories = (req, res) => {
  const categories = Category.findAll().then(category => {
    console.log('All product categories: ', JSON.stringify(category, null, 4));
  });
};

module.exports = {
  getCategories
};