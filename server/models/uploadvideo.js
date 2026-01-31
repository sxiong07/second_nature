const mongoose = require("mongoose");

const UploadVideoSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  url: String,
  key: String,
  originalName: String,
  createdAt: Date,
});

module.exports = mongoose.model("uploadvideo", UploadVideoSchema);
