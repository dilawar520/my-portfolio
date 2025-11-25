const mongoose = require('mongoose');
const usermodel = new mongoose.Schema({
  password: { type: String, required: true },
  email:{type:String,required: true},
  role:{
    type:String,
    default:'user',
  }
});
const model = mongoose.model('user', usermodel);
module.exports=model;