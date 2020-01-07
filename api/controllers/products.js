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
    const product = Product.findOne({
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
  const id = req.params.productId;
  const product = {
    Description: req.body.description,
    Stock: req.body.stock,
    Price: req.body.price
  };

  if (!id) {
    res.status(500).json({
      message: 'Invalid Id'
    });
  } else {
    Product.update({
      Description: product.Description,
      Stock: product.Stock,
      Price: product.Price
    },
    {
      where: {
        ProductId: id
      }
    })
      .then(count => {
        const response = {
          message: `${count} Rows updated`,
          type: 'PATCH'
        };
        res.status(200).json({
          response
        });
      }).catch(err => res.status(500).json({ error: err.message }));
  }
};

// Delete product
const deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  if (!id) {
    res.status(500).json({
      message: 'Invalid Id'
    });
  } else {
    Product.destroy({
      where: {
        ProductId: id
      }
    })
      .then(count => {
        const response = {
          message: `${count} Rows deleted`,
          type: 'DELETE'
        };
        res.status(200).json({
          response
        });
      });

  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};