const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const room = require('./roomSubSchema');

const userSchema = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true
  },
  rooms: [room]
});

const User = mongoose.model('user', userSchema);

module.exports = User;