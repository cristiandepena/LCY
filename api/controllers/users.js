const database = require('../../config/database');
const User = database.import('../models/users');

// Get all users
const getUsers = (req, res) => {
  const users = User.findAll().then(user => {
    console.log('All Users: ', JSON.stringify(user, null, 4));
    res.status(200).json({
      users: user,
      message: 'Handling GET request for /users'
    });
  });
};

// Get user by id
const getUserById = (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.status(401).json({
      message: 'Invalid id'
    });
  } else {
    const user = User.findAll({
      where: {
        UserId: id
      }
    }).then(user => {
      console.log('User: ', JSON.stringify(user, null, 4));
      res.status(200).json({
        product,
        message: 'Handling GET request to /users/id ' + id
      });
    });
  }
};

// Create user
const createUser = (req, res) => {
  const user = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email
  };

  res.status(201).json({
    message: 'Handling POST request to /users',
    createdUser: user
  });
};

// Update user
const updateUser = (req, res) => {
  res.status(200).json({
    message: 'Handling PATCH request to /users'
  });
};

// Delete product
const deleteUser = (req, res) => {
  res.status(200).json({
    message: 'Handling DELETE request to /users'
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};