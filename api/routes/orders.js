const express = require('express');
const { getOrders } = require('../controllers/orders');

const router = express.Router();

router.get('/', getOrders);

module.exports = router;