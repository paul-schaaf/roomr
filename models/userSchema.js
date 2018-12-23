const mongoose = require('mongoose');

const { Schema } = mongoose;
const room = require('./roomSubSchema');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  rooms: [room],
});

mongoose.model('users', userSchema);
