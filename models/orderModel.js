const mongoose = require("mongoose");
const User = require("./userModel");
const Item = require("./itemsModel");
const Address = require("./addressModel");

const orderSchema = new mongoose.Schema({
  totalQuantity: Number,
  totalAmount: Number,
  user: { type: mongoose.Schema.ObjectId, ref: User },
  item: { type: [mongoose.Schema.ObjectId], ref: Item },
  address: { type: mongoose.Schema.ObjectId, ref: Address },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
