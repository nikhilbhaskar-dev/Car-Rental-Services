const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const { createRental, returnRental, getUserRentals } = require('../controllers/rentalController');

router.post('/', protect, createRental);

router.put('/:id/return', protect, returnRental);


module.exports = router;