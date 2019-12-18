const database = require('../../config/database');
const Order = database.import('../models/orders');

// Get all products
const getOrders = (req, res) => {
  const orders = Order.findAll().then(order => {
    console.log('All Orders: ', JSON.stringify(order, null, 4));
    res.status(200).json({
      order,
      message:'Handling GET request to /orders'
    });
  });
  
};

module.exports = {
  getOrders
};