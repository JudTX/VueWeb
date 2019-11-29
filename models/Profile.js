const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//创建schema
const proFileSchema = new Schema({
  type:{
    type: String,
    required: true
  },
  describe:{
    type: String,
  },
  income:{
    type: String,
    required: true
  },
  expend:{
    type: String,
    required: true
  },
  cash:{
    type: String,
    required: true
  },
  remark:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model("profile",proFileSchema);