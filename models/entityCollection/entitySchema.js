const mongoose = require('mongoose');
const { Schema } = mongoose;
const users = require('./userSubSchema');
const rooms = require('./roomSubSchema');

const entitySchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true
  },
  users: [users],
  rooms: [rooms]
});

mongoose.model('entities', entitySchema);