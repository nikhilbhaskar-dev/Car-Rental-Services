const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car', 
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: { 
    type: Date,
    required: true,
  },
  totalCost: { 
    type: Number,
    default: 0,
  },
  returned: { 
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);