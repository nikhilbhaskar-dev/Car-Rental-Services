const Rental = require('../models/Rental');
const Car = require('../models/Car');

const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? 1 : diffDays;
};

exports.createRental = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const userId = req.user._id;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    if (!car.available) {
      return res.status(400).json({
        success: false,
        message: 'Car is not available for rent',
      });
    }

    car.available = false;
    await car.save();

    const rental = await Rental.create({
      userId,
      carId,
      startDate,
      endDate,
    });

    res.status(201).json({
      success: true,
      data: rental,
      message: 'Car rented successfully',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

exports.returnRental = async (req, res) => {
  try {
    const rentalId = req.params.id;

    const rental = await Rental.findById(rentalId).populate('carId');

    if (!rental) {
      return res.status(404).json({ success: false, message: 'Rental record not found' });
    }

    if (rental.returned) {
      return res.status(400).json({ success: false, message: 'This car has already been returned' });
    }

    const car = rental.carId;
    car.available = true;
    await car.save();

    const daysRented = calculateDays(rental.startDate, Date.now()); 
    const totalCost = daysRented * car.dailyRate;

    rental.returned = true;
    rental.totalCost = totalCost;
    await rental.save();

    res.status(200).json({
      success: true,
      data: rental,
      message: 'Car returned successfully',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

exports.getUserRentals = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const loggedInUserId = req.user._id.toString();

    if (targetUserId !== loggedInUserId) {
      return res.status(403).json({ 
        success: false,
        message: 'Forbidden: You can only view your own rental history',
      });
    }

    const rentals = await Rental.find({ userId: loggedInUserId })
                                .populate('carId', 'brand model dailyRate')
                                .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      count: rentals.length,
      data: rentals,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};