const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Please provide a car brand'],
  },
  model: {
    type: String,
    required: [true, 'Please provide a car model'],
  },
  dailyRate: {
    type: Number,
    required: [true, 'Please provide a daily rental rate'],
  },
  available: {
    type: Boolean,
    default: true, 
  },
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);