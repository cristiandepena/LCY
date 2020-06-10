const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', checkAuth, createProduct);
router.patch('/:productId', checkAuth, updateProduct);
router.delete('/:productId', checkAuth, deleteProduct);

module.exports = router;