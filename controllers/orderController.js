const AppError = require("./../utils/appError");
const Order = require("./../models/orderModel");
const ApiFeatures = require("./../utils/apiFeatures");

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
exports.getAllOrders = async (req, res, next) => {
  try {
    // Implementing API Features
    const features = new ApiFeatures(Order.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const orders = await features.query;

    if (orders.length === 0)
      return next(new AppError(404, "Orders list empty"));

    res.status(200).json({
      status: "success",
      results: orders.length,
      orders,
    });
  } catch (err) {
    console.log("getAllOrders controller", err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    if (
      !req.body.address ||
      !req.body.item ||
      !req.body.totalQuantity ||
      !req.body.totalAmount
    )
      return next(new AppError(400, "Please fill all the necessary details."));

    const order = await Order.create(req.body);

    res.status(200).json({ status: "success", order });
  } catch (err) {
    console.log("createOrder controller", err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate({
      path: "user",
    });

    if (!order) return next(new AppError(404, "No order found with this ID"));

    // Checking if the order is of currently logged in user
    await checkCurrentUser(
      order.user._id.toHexString(),
      req.user._id.toHexString(),
      next
    );

    res.status(200).json({ status: "success", order });
  } catch (err) {
    console.log("orderController getOrder", err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);

    // If no order found
    if (!order) return next(new AppError(400, "No order found with this ID"));

    // Checking if the order is of currently logged in user
    await checkCurrentUser(
      order.user.toHexString(),
      req.user._id.toHexString(),
      next
    );

    // Deleting the order
    await Order.findByIdAndDelete(req.params.orderId);

    // Response
    res.status(200).json({
      status: "success",
      message: "Order Deleted",
    });
  } catch (err) {
    console.log("orderController deleteOrder", err);
  }
};
