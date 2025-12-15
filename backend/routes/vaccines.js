const express = require('express');
const router = express.Router();
const {
  getVaccines,
  getVaccine,
  createVaccine,
  updateVaccine,
  deleteVaccine
} = require('../controllers/vaccineController');

// Public routes
router.route('/')
  .get(getVaccines)
  .post(createVaccine); // For demo purposes, making it public

router.route('/:id')
  .get(getVaccine)
  .put(updateVaccine) // For demo purposes, making it public
  .delete(deleteVaccine); // For demo purposes, making it public

module.exports = router;

