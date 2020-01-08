const database = require('../../config/database');
const User = database.import('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  User.findOne({
    where: {
      Email: req.body.email
    }
  }).then(user => {
    if (user) {
      return res.status(409).json({
        message: 'An user already exists with the email provided'
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = User.create({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Email: req.body.email,
            Password: hash,
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
      });
    };
  }).catch(err => {
    return res.status(500).json({
      error: err.message
    });
  });
};

const login = (req, res, next) => {
  User.findOne({
    raw: true,
    where: {
      Email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }

    bcrypt.compare(req.body.password, user.Password).then(result => {
      if (result) {
        const token = jwt.sign({
          email: user.Email,
          userId: user.UserId
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h',
        });
        return res.status(200).json({
          message: 'Auth successful',
          token: token
        }
        );
      } else {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
    }).catch(err => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }
    });
  }).catch(err => res.status(500).json({ error: err.message }));
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
  deleteUser,
  login
};