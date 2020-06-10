const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
} = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/signUp', createUser);
router.post('/login', login);
router.patch('/:userId', checkAuth, updateUser);
router.delete('/:userId', checkAuth, deleteUser);

module.exports = router;