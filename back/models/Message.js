const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  userId: { type: String },
  message: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  date: { type: Number },
});

module.exports = mongoose.model("Message", messageSchema);
