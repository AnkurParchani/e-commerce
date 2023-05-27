const mongoose = require("mongoose");
const User = require("./userModel");
const AppError = require("../utils/appError");

const addressSchema = new mongoose.Schema({
  country: String,
  fullName: String,
  phoneNumber: { type: Number, unique: true },
  area: String,
  landmark: String,
  city: String,
  state: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
});

const Address = mongoose.model("address", addressSchema);

module.exports = Address;
