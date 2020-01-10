const database = require('../../config/database');
const Order = database.import('../models/orders');
const OrderDetails = database.import('../models/orderDetails');


// Get all orders
const getOrders = (req, res) => {
  const orders = Order.findAll({
    attributes:['OrderId', 'Total', 'UserId'],
    include: [{
      model: OrderDetails,
      attributes: ['Quantity', 'Price', 'ProductId', 'OrderId'],
      where: {
        OrderId: database.col('Orders.OrderId')
      }
    }]
  }).then(order => {
    console.log('All Orders: ', JSON.stringify(order, null, 4));
    res.status(200).json({
      orders: order,
      message: 'Handling GET request to /orders'
    });
  }).catch(err => res.status(500).json({ error: err.message }));;
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
      res.status(200).json({
        orders: order,
        message: 'Handling GET request to /Orders/ ' + id
      });
    }).catch(err => res.status(500).json({ error: err.message }));;
  }
};

// Create Order
const createOrder = (req, res, next) => {
  const items = req.body.items.map(item => {
    return {
      Quantity: item.quantity,
      Price: item.price,
      ProductId: item.productId
    };
  });
  const order = Order.create({
    Total: req.body.total,
    UserId: req.body.userId,
    CreatedBy: req.body.createdBy,
    OrderDetails: items
  }, {
    include: [OrderDetails]
  }).then(row => {
    res.status(201).json({
      createdOrder: row.dataValues,
      message: 'Handling POST request to /Orders'
    });
  }).catch(err => res.status(500).json({ error: err.message }));
};

// Delete order
const deleteOrder = (req, res, next) => {
  const id = req.params.orderId;
  if (!id) {
    res.status(500).json({
      message: 'Invalid Id'
    });
  } else {
    Order.destroy({
      where: {
        OrderId: id
      }
    })
      .then(count => {
        const response = {
          message: `${count} Rows deleted`,
          type: 'DELETE'
        };
        res.status(200).json({
          response
        });
      }).catch(err => res.status(500).json({ error: err.message }));

  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder
};