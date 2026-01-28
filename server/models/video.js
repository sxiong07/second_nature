const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    id: String,
    title: String,
    thumbnail: Object,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
});

module.exports = mongoose.model("video", VideoSchema);  