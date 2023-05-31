const mongoose = require("mongoose");

const Item = require("./itemsModel");
const User = require("./userModel");

const wishListSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.ObjectId, ref: Item },
  user: { type: mongoose.Schema.ObjectId, ref: User },
});

const WishList = mongoose.model("wishlist", wishListSchema);

module.exports = WishList;
