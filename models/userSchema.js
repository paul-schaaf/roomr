const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const post = require('./room');

const userSchema = new Schema ({
  email: String,
  rooms: [room]
});