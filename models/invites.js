const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
  senderName: {
    type: String,
    require: true
  },
  eventName: {
    type: String,
    required: true
  },
  eventDesc: {
    type: String,
    required: true
  },
  recepientName:{
    type:String,
    required:true
  },
  accepted:{
    type:String,
    required:false
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Invites", shareSchema);
