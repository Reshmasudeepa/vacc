
const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  getUserByEmail
} = require('../controllers/userController');

// Public routes
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/email/:email')
  .get(getUserByEmail);

module.exports = router;

