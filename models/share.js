const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
  userID: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
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
  invitedUser: [
    {
      userName: String,
    },
  ],
});

module.exports = mongoose.model("Shares", shareSchema);
