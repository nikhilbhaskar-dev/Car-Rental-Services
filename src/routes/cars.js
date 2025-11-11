const express = require('express');
const router = express.Router();

const { addCar, getAllCars } = require('../controllers/carController.js');

router.post('/', addCar);

router.get('/',getAllCars);

router.get('/', getAllCars);

module.exports = router;