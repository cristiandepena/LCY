const database = require('../config/database');
const Product = database.import('../models/product');

// Get all products
const getProducts = (req, res) => {
  const products = Product.findAll().then(product => {
    console.log('All products: ', JSON.stringify(product, null, 4));
    res.status(200).json({
      product,
      message:'Handling GET request'
    });
  });
  
};

module.exports = {
  getProducts
};