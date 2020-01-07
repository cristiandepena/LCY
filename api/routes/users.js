const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/signUp', createUser);
router.post('/login', login);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;