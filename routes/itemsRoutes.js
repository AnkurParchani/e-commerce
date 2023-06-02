const express = require("express");

const authController = require("./../controllers/authController");
const itemsController = require("../controllers/itemsController");

const router = express.Router();

// Routes
router
  .route("/")
  .get(itemsController.getAllItems)
  .post(
    authController.protect,
    authController.checkIsAdmin,
    itemsController.postItem
  );

router
  .route("/:itemId")
  .get(itemsController.getItem)
  .delete(
    authController.protect,
    authController.checkIsAdmin,
    itemsController.deleteItem
  )
  .patch(
    authController.protect,
    authController.checkIsAdmin,
    itemsController.updateOne
  );

module.exports = router;
