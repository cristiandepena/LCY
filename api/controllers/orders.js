const database = require('../../config/database');
const Order = database.import('../models/orders');
const orderDetails = database.import('../models/orderDetails');


// Get all orders
const getOrders = (req, res) => {
  const orders = Order.findAll({
    attributes:['OrderId', 'Total', 'UserId'],
    include: [{
      model: orderDetails,
      attributes: ['Quantity', 'Price', 'ProductId', 'OrderId'],
      where: {
        OrderId: database.col('Orders.OrderId')
      }
    }]
  }).then(order => {
    console.log('All Orders: ', JSON.stringify(order, null, 4));
    res.status(200).json({
      order,
      message: 'Handling GET request to /orders'
    });
  });
};

// Get order by id
const getOrderById = (req, res) => {
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
      console.log('Order: ', JSON.stringify(cat, null, 4));
      res.status(200).json({
        orders: order,
        message: 'Handling GET request to /Orders/ ' + id
      });
    });
  }
};

// Create Order
const createOrder = (req, res, next) => {
  const order = Order.create({
    Total: req.body.Total,
    UserId: req.body.userId,
    ItemCount: req.body.itemCount,
    CreatedBy: req.body.createdBy
  }).then(row => {
    res.status(201).json({
      createdOrder: row.dataValues,
      message: 'Handling POST request to /Orders'
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
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder
};