const express = require('express');
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/productCategories');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryId', getCategoryById);
router.post('/', checkAuth, createCategory);
router.patch('/:categoryId', checkAuth, updateCategory);
router.delete('/:categoryId', checkAuth, deleteCategory);


module.exports = router;