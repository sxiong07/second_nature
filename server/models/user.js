const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  profilePic: String,
  lastLogin: Date,
  creationDate: Date,
  loginStreak: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
