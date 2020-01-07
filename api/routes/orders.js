const express = require('express');
const {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder
} = require('../controllers/orders');

const router = express.Router();

router.get('/', getOrders);
router.get('/:orderId', getOrderById);
router.post('/', createOrder);
router.delete('/:orderId', deleteOrder);


module.exports = router;