const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: [String],
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: Number,
  details: {
    // For normal things like colour, material, manufacturedIn.... etc.
    type: Object,
    required: false,
  },
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;
