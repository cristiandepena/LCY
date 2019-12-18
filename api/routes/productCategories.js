const express = require('express');
const { getCategories } = require('../controllers/productCategories');

const router = express.Router();

router.get('/', getCategories);

module.exports = router;