const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  userID:{
    type:String,
    require:true
  },
  userName:{
    type:String
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Events", eventSchema);
