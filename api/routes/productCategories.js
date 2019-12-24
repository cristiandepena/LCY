const express = require('express');
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/productCategories');

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryId', getCategoryById);
router.post('/', createCategory);
router.patch('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);


module.exports = router;