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
    const address = await Address.find();

    if (address.length === 0)
      return next(new AppError(400, "No address present"));

    res.status(200).json({ status: "success", address });
  } catch (err) {
    console.log("getAllAddress method", err);
  }
};

exports.getOneAddress = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.addressId);

    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    await checkCurrentUser(
      address.user.toHexString(),
      req.user._id.toHexString(),
      next
    );

    if (!address)
      return next(new AppError(404, "No address found with this ID"));

    res.status(200).json({ status: "success", address });
  } catch (err) {
    console.log("getOneAddress", err);
  }
};

exports.addAddress = async (req, res, next) => {
  if (
    !req.body.country ||
    !req.body.phoneNumber ||
    !req.body.area ||
    !req.body.state ||
    !req.body.fullName ||
    !req.body.city
  )
    return next(new AppError(400, "Please provide all the necessary details"));

  // Adding the currently logged in user id to the address
  req.body.user = req.user._id;

  const address = await Address.create(req.body);

  res.status(200).json({
    status: "success",
    address,
  });
};

exports.updateAddress = async (req, res, next) => {
  const address = await Address.findByIdAndUpdate(req.params.addressId);

  if (!address) return next(new AppError(404, "No address found with this ID"));

  await checkCurrentUser(
    address.user.toHexString(),
    req.user._id.toHexString(),
    next
  );

  res.status(200).json({ status: "success", address });
};

exports.deleteAddress = async (req, res, next) => {
  const address = await Address.findById(req.params.addressId);

  if (!address) return next(new AppError(404, "No address found with this ID"));

  await checkCurrentUser(
    address.user.toHexString(),
    req.user._id.toHexString(),
    next
  );

  await Address.findByIdAndDelete(req.params.addressId);

  res.status(204).json({ status: "success", deletedAddress: address });
};
