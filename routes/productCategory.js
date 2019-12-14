const express = require('express');
const { getCategories } = require('../controllers/productCategory');

const router = express.Router();

router.get('/', getCategories);

module.exports = router;