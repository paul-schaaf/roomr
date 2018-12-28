const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSubSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
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