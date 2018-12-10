const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const room = require('./roomSubSchema');

const userSchema = new Schema ({
  email: String,
  rooms: [room]
});