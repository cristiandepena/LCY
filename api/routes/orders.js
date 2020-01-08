const express = require('express');
const {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder
} = require('../controllers/orders');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', checkAuth, getOrders);
router.get('/:orderId', checkAuth, getOrderById);
router.post('/', checkAuth, createOrder);
router.delete('/:orderId', checkAuth, deleteOrder);


module.exports = router;