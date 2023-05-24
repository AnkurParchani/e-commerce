const User = require("../models/userModel");
const AppError = require("../utils/appError");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users.length === 0)
      return next(new AppError(404, "No users found in the list"));

    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    console.log("Error from user controller", err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return next(new AppError(404, "No user found with this ID"));

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log("Error from user controller", err);
  }
};

exports.postUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log("Error from post user", err);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });

    if (!user) return next(new AppError(404, "No user found with this ID"));

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log("Error from user controller", err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete(req.params.userId);

    if (!user) return next(new AppError(404, "No user found with this ID"));

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log("Error from user controller", err);
  }
};
