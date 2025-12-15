const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  completeDose
} = require('../controllers/bookingController');

// Public routes
router.route('/')
  .get(getBookings)
  .post(createBooking);


router.route('/:id')
  .get(getBooking)
  .put(updateBooking)
  .delete(cancelBooking);

// Mark a dose as completed
router.post('/:id/complete-dose', completeDose);

module.exports = router;

