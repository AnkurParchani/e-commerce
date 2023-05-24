const Item = require("../models/itemsModel");
const AppError = require("../utils/appError");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json({
      status: "success",
      items,
    });
  } catch (err) {
    console.log("Error from item controller", err);
  }
};

exports.getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) return next(new AppError(404, "No Item found with this ID"));

    res.status(200).json({
      status: "success",
      item,
    });
  } catch (err) {
    console.log("Error from item controller", err);
  }
};

exports.postItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);

    res.status(200).json({
      status: "success",
      item,
    });
  } catch (err) {
    console.log("Error from post item", err);
  }
};
