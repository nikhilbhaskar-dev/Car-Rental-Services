const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/userController');
const { getUserRentals } = require('../controllers/rentalController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.get('/:id/rentals', protect, getUserRentals);

module.exports = router;