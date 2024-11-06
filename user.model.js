const mongoose = require('mongoose');
const isWithinRange = require('./isWithinRange');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const User = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

User.pre('save', async function (next) {
  const Stop = mongoose.model('Stop');
  const stops = await Stop.find();
  isWithinRange(lat1, lon1, lat2, lon2);

  for (let stop of stops) {
    if (
      isWithinRange(
        this.latitude,
        this.longitude,
        stop.latitude,
        stop.longitude
      )
    ) {
      stop.isArrived = true;
      await stop.save();
    }
  }

  next();
});

User.plugin(AutoIncrement, { inc_field: 'itemId' });

module.exports = mongoose.model('User', User);
