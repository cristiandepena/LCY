const express = require('express');
const {
  getOrders,
  getOrderById,
  createOrderDetails,
  deleteOrder
} = require('../controllers/orderDetails');

const router = express.Router();

// router.get('/', getOrders);
// router.get('/:OrderId', getOrderById);
router.post('/', createOrderDetails);
// router.delete('/:OrderId', deleteOrder);


module.exports = router;