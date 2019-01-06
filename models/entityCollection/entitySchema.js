const mongoose = require('mongoose');

const { Schema } = mongoose;
const users = require('./userSubSchema');
const rooms = require('./roomSubSchema');

const entitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  adminCount: {
    type: Number,
    required: true,
    default: 1,
  },
  lastUpdated: {
    type: Date,
    required: true
  },
  users: [users],
  rooms: [rooms],
});

mongoose.model('entities', entitySchema);
