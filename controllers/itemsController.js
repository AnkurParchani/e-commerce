const AppError = require("../utils/appError");
const Item = require("../models/itemsModel");

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find();

    if (items.length === 0)
      return next(new AppError(404, "No items found in the list"));

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

exports.updateOne = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.itemId, req.body, {
      new: true,
    });

    if (!item) return next(new AppError(404, "No item found with this ID"));

    res.status(200).json({
      status: "success",
      item,
    });
  } catch (err) {
    console.log("Error from item controller", err);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.itemId });

    if (!item) return next(new AppError(404, "No Item found with this ID"));

    res.status(200).json({
      status: "success",
      item,
    });
  } catch (err) {
    console.log("Error from item controller", err);
  }
};
