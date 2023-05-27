const mongoose = require("mongoose");
const Item = require("./itemsModel");
const User = require("./userModel");

const reviewSchema = new mongoose.Schema({
  stars: { type: Number },
  review: { type: String },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: Item,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
