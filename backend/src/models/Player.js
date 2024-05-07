const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  wins: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Player', PlayerSchema);
