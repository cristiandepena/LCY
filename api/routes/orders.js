const express = require('express');
const {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder
} = require('../controllers/orders');

const router = express.Router();

router.get('/', getOrders);
router.get('/:OrderId', getOrderById);
router.post('/', createOrder);
router.delete('/:OrderId', deleteOrder);


module.exports = router;