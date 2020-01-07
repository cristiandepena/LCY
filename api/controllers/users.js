const database = require('../../config/database');
const User = database.import('../models/users');

// Get all users
const getUsers = (req, res) => {
  const users = User.findAll().then(user => {
    res.status(200).json({
      users: user,
      message: 'Handling GET request for /users'
    });
  }).catch(err => res.status(500).json({ error: err.message }));
};

// Get user by id
const getUserById = (req, res) => {
  const id = req.params.userId;
  if (!id) {
    res.status(401).json({
      message: 'Invalid id'
    });
  } else {
    const user = User.findOne({
      where: {
        UserId: id,
        Active: true
      }
    }).then(user => {
      res.status(200).json({
        user,
        message: 'Handling GET request to /users/id ' + id
      });
    }).catch(err => res.status(500).json({ error: err.message }));
  }
};

// Create user
const createUser = (req, res, next) => {
  const user = User.create({
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    Email: req.body.email,
    Password: req.body.password,
    CreatedBy: req.body.createdBy
  }).then(row => {
    res.status(201).json({
      createdUser: row.dataValues,
      message: 'Handling POST request to /users'
    });
  }).catch(err => {
    res.status(500).json({
      error: err.message
    });
  });
};

// Update user
const updateUser = (req, res, next) => {
  const id = req.params.userId;
  const user = {
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    Email: req.body.email,
    Password: req.body.password
  };
  
  if (!id) {
    res.status(500).json({
      message: 'Invalid Id'
    });
  } else {
    User.update({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Password: user.Password
    },
    {
      where: {
        UserId: id
      }
    })
      .then(count => {
        const response = {
          message: `${count} Rows updated`,
          type: 'PATCH'
        };
        res.status(200).json({
          response
        });
      }).catch(err => res.status(500).json({ error: err.message }));
  }
};

// Delete product
const deleteUser = (req, res) => {
  const id = req.params.userId;
  if (!id) {
    res.status(500).json({
      message: 'Invalid Id'
    });
  } else {
    User.destroy({
      where: {
        UserId: id
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
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};