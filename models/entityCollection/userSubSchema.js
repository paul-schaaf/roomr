const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSubSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  entity: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = userSubSchema;