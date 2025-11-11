
const Car = require('../models/Car'); 

exports.addCar = async (req, res) => {
  try {
    const { brand, model, dailyRate } = req.body;

    if (!brand || !model || !dailyRate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide brand, model, and dailyRate',
      });
    }

    const car = new Car({
      brand,
      model,
      dailyRate,
    });

    const savedCar = await car.save();

    res.status(201).json({
      success: true,
      data: savedCar,
      message: 'Car added successfully',
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: 'Error adding car: ' + error.message,
    });
  }
};



exports.getAllCars = async (req, res) => {
  try {
   
    const query = {};
    if (req.query.available) {
      query.available = req.query.available === 'true';
    }


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    
    const cars = await Car.find(query) 
                          .skip(skip)     
                          .limit(limit);  

    
    res.status(200).json({
      success: true,
      count: cars.length, 
      page: page,
      data: cars,
      message: 'Cars retrieved successfully',
    });

  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};