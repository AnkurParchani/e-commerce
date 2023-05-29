const ApiFeatures = require("../utils/apiFeatures");
const Address = require("./../models/addressModel");
const AppError = require("./../utils/appError");

// Checking if the user is doing his action and not of any other user.
function checkCurrentUser(userId, actionUserId, next) {
  return new Promise((resolve, reject) => {
    if (userId !== actionUserId) {
      reject(
        next(new AppError(401, "You are not authorized to do this action"))
      );
    } else {
      resolve();
    }
  });
}

// HTTP Methods
exports.getAllAddress = async (req, res, next) => {
  try {
    // Implementing apiFeatures
    const features = new ApiFeatures(Address.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const address = await features.query;

    if (address.length === 0)
      return next(new AppError(400, "No address present"));

    res
      .status(200)
      .json({ status: "success", results: address.length, address });
  } catch (err) {
    console.log("getAllAddress method", err);
  }
};

exports.getOneAddress = async (req, res, next) => {
  try {
    // Finding the address
    const address = await Address.findById(req.params.addressId);

    // If No address found
    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    // Checking if the address belongs to the currently logged in user
    await checkCurrentUser(
      address.user.toHexString(),
      req.user._id.toHexString(),
      next
    );

    // Sending the response
    res.status(200).json({ status: "success", address });
  } catch (err) {
    console.log("getOneAddress", err);
  }
};

exports.addAddress = async (req, res, next) => {
  try {
    if (
      !req.body.country ||
      !req.body.phoneNumber ||
      !req.body.area ||
      !req.body.state ||
      !req.body.fullName ||
      !req.body.city
    )
      return next(
        new AppError(400, "Please provide all the necessary details")
      );

    // Adding the currently logged in user id to the address
    req.body.user = req.user._id;

    const address = await Address.create(req.body);

    res.status(200).json({
      status: "success",
      address,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new AppError(400, "Phone number already exists"));
    } else {
      console.log("createAddress error", err);
    }
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    // Finding the address
    const address = await Address.findById(req.params.addressId);

    // If there's no address
    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    // Checking if the address belongs to the currently logged in user
    await checkCurrentUser(
      address.user.toHexString(),
      req.user._id.toHexString(),
      next
    );

    // Updating the address
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.addressId,
      req.body,
      { new: true }
    );

    // Sending the response
    res.status(200).json({ status: "success", updatedAddress });
  } catch (err) {
    console.log("Error from updateAddress", err);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    // Finding the address
    const address = await Address.findById(req.params.addressId);

    // If no address found
    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    // Cheking if the address found belongs to the currently logged in user
    await checkCurrentUser(
      address.user.toHexString(),
      req.user._id.toHexString(),
      next
    );

    // Deleting the address
    await Address.findByIdAndDelete(req.params.addressId);

    // Response
    res.status(204).json({ status: "success" });
  } catch (err) {
    console.log("deleteAddress function", err);
  }
};
