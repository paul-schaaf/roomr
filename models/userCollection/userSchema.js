const mongoose = require('mongoose');
const { Schema } = mongoose;
const entities = require('./entitySubSchema');

const userSchema = new Schema ({
  email: {
    type: String,
    required: true
  },
  activeEntity: {
    type: String,
    default: 'none',
    required:true
  },
  isAdminNow: {
    type: Boolean,
    default: false,
    required:true
  },
  entities: [entities]
});

mongoose.model('users', userSchema);