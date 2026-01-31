const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  id: String,
  title: String,
  thumbnail: Object,
  userId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("video", VideoSchema);
