const mongoose = require('mongoose');
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

User.plugin(AutoIncrement, { inc_field: 'itemId' });

module.exports = mongoose.model('User', User);
