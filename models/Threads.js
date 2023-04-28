const mongoose = require('mongoose');

const ThreadsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  content: {
    type: String,
    required: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  },
  replies: [{
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    postTime: {
      type: Date,
      default: Date.now,
    },
  }]
});

// ThreadsSchemaを、Threadsで他のファイルで使えるように
module.exports = mongoose.model("Threads", ThreadsSchema);