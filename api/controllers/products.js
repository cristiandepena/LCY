const database = require('../../config/database');
const Product = database.import('../models/products');

// Get all products
const getProducts = (req, res) => {
  const products = Product.findAll({ raw: true })
    .then(product => {
      const response = {
        count: product.length,
        products: product.map(product => {
          return {
            id: product.ProductId,
            description: product.Description,
            price: product.Price,
            request: {
              type: 'GET',
              url: 'http://localhost:8080/products/' + product.ProductId
            }
          };
        })
      };

      res.status(200).json({
        response
      });
    });
};

// Get product by id
const getProductById = (req, res) => {
  const id = req.params.productId;

  if (id) {
    const product = Product.findAll({
      raw: true,
      attributes: ['Description', 'Stock', 'Price', 'Active'],
      where: {
        ProductId: id
      }
    }).then(product => {
      res.status(200).json({
        product,
        message: 'Handling GET request to /products/'
      });
    });
  } else {
    res.status(401).json({
      message: 'Invalid id'
    });
  }
};

// Create product
const createProduct = (req, res, next) => {
  const product = Product.create({
    Description: req.body.description,
    Stock: req.body.stock,
    Price: req.body.price,
    CategoryId: req.body.categoryId,
    CreatedBy: req.body.createdBy
  }).then(row => {
    res.status(201).json({
      message: 'Handling POST request to /products',
      productId: row.ProductId,
      createdProduct: row.dataValues
    });
  }).catch(err => res.status(500).json({ error: err.message }));
};

// Update product
const updateProduct = (req, res, next) => {
  res.status(200).json({
    message: 'Handling PATCH request to /products'
  });
};

// Delete product
const deleteProduct = (req, res, next) => {
  res.status(200).json({
    message: 'Handling DELETE request to /products'
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};