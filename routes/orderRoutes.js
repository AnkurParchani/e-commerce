const express = require("express");
const authController = require("./../controllers/authController");
const orderController = require("./../controllers/orderController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(authController.checkIsAdmin, orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route("/:orderId")
  .get(orderController.getOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
