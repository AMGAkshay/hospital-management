const mongoose = require("mongoose");

const User = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  hospitalName: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("User", User);
