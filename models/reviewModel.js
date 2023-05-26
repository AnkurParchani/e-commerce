const mongoose = require("mongoose");
const Item = require("./itemsModel");

const reviewSchema = new mongoose.Schema({
  stars: { required: true, type: Number },
  review: { required: true, type: String },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: Item,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
