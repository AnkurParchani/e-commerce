const AppError = require("../utils/appError");
const WishList = require("./../models/wishListModel");

exports.createItem = async (req, res, next) => {
  try {
    const item = await WishList.create({
      item: req.body.item,
      user: req.user._id,
    });

    res.status(200).json({
      status: "success",
      listItem: item,
    });
  } catch (err) {
    return next(new AppError(500, "Something went wrong"));
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await WishList.find({ user: req.user._id });

    if (items.length === 0)
      return next(
        new AppError(404, "There are currently no items in your wishlist")
      );

    res.status(200).json({ status: "success", results: items.length, items });
  } catch (err) {
    return next(
      new AppError(500, "Something went wrong, please try again later")
    );
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const item = await WishList.findOneAndDelete({
      _id: req.params.wishListItemId,
    }).where({ user: req.user._id });

    if (!item) return next(new AppError(404, "No item found with this ID"));

    res.status(200).json({ status: "success", message: "Deleted" });
  } catch (err) {
    return next(new AppError(500, "Something went wrong, try again later."));
  }
};

exports.deleteAllItem = async (req, res, next) => {
  try {
    const items = await WishList.deleteMany({ user: req.user._id });

    if (!items) return next(new AppError(404, "No items found in your list"));

    res.status(200).json({
      status: "success",
      message: "Deleted all items",
    });
  } catch (err) {
    return next(new AppError(500, "Something went wrong, try again later."));
  }
};
