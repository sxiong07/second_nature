const mongoose = require("mongoose");

const UploadVideoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  url: {
    type: String,
    required: true,
  },

  key: {
    type: String,
    required: true,
  },
  originalName: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("uploadvideo", UploadVideoSchema);
