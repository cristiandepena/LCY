const database = require('../../config/database');
const OrderDetails = database.import('../models/orderDetails');

// Get all products
const getOrdersDetails = (req, res) => {
  const orders = Order.findAll().then(order => {
    console.log('All Orders details: ', JSON.stringify(order, null, 4));
    res.status(200).json({
      order,
      message: 'Handling GET request to /ordersDetails'
    });
  });
};

// Get order details by id
const getOrderDetailsById = (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.status(401).json({
      message: 'Invalid id'
    });
  } else {
    const order = Order.findAll({
      where: {
        OrderId: id
      }
    }).then(order => {
      console.log('Order Details: ', JSON.stringify(cat, null, 4));
      res.status(200).json({
        orders: order,
        message: 'Handling GET request to /Orders/ ' + id
      });
    });
  }
};

// Create Order
const createOrderDetails = (req, res, next) => {
  const order = OrderDetails.create({
    Quantity: req.body.quantity,
    Price: req.body.price,
    OrderId: req.body.orderId,
    ProductId: req.body.productId
  }).then(row => {
    res.status(201).json({
      createdOrderDetails: row.dataValues,
      message: 'Handling POST request to /OrdersDetails'
    });
  });
};

// Delete order
const deleteOrder = (req, res) => {
  res.status(200).json({
    message: 'Handling DELETE request to /Order'
  });
};


module.exports = {
  getOrdersDetails,
  getOrderDetailsById,
  createOrderDetails
};