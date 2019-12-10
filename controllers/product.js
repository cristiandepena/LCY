const Product = require('../models/product');

// Get all products
const getProducts = (req, res) => {
    const products = Product.findAll().then(product => {
        console.log("All products: ", JSON.stringify(products, null, 4)); 
    });
};

module.exports = {
    getProducts
}