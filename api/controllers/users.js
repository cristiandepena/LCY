const database = require('../../config/database');
const User = database.import('../models/users');

// Get all products
const getUsers = (req, res) => {
  const users = User.findAll().then(user => {
    console.log('All Users: ', JSON.stringify(user, null, 4));
    res.status(200).json({
      users: user,
      message:'Handling GET request for /users'
    });
  });
  
};

module.exports = {
  getUsers
};