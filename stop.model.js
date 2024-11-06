const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
    validate(value) {
      if (value < -90 || value > 90) {
        throw new Error('Latitude must be between -90 and 90 degrees');
      }
    },
  },
  longitude: {
    type: Number,
    required: true,
    validate(value) {
      if (value < -180 || value > 180) {
        throw new Error('Longitude must be between -180 and 180 degrees');
      }
    },
  },
});

const Stop = mongoose.model('Stop', stopSchema);

module.exports = Stop;
