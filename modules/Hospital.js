const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema({
  // hospitalName: {
  //   type: String,
  //   required: true,
  // },
  images: {
    type: [],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("hospitalinfo", hospitalSchema);
