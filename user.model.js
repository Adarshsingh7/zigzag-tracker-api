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

User.pre(/^findOneAnd/, async function (next) {
  const Stop = mongoose.model('Stop');
  const stops = await Stop.find();
  // const data = this.findOne();
  console.log(this._update);

  for (let stop of stops) {
    if (
      isWithinRange(
        this._update.latitude,
        this._update.longitude,
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
