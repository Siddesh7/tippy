const mongoose = require("mongoose");

const userDeets = new mongoose.Schema({
  name: {
    type: String,
  },
  wallet: {
    type: String,
  },
  twitter: {
    type: String,
  },
  youtube: {
    type: String,
  },
});

module.exports = mongoose.model("userDeets", userDeets);
