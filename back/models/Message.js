const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  userId: { type: String },
  message: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  date: { type: Date },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: Array },
  usersDisliked: { type: Array },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Message", messageSchema);
