const express = require("express");
const authController = require("./../controllers/authController");
const wishListController = require("./../controllers/wishListController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(wishListController.createItem)
  .delete(wishListController.deleteAllItem)
  .get(wishListController.getAllItems);

router.route("/:wishListItemId").delete(wishListController.deleteOne);

module.exports = router;
