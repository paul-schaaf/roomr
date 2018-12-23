const mongoose = require('mongoose');
const { Schema } = mongoose;

const entitySubSchema = new Schema({
  name:String,
  isAdmin:{
    type:Boolean,
    required: true,
    default:false,
  }
});


module.exports = entitySubSchema;