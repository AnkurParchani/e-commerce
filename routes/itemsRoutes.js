const express = require("express");

const authController = require("./../controllers/authController");
const itemsController = require("../controllers/itemsController");

const router = express.Router();

// Checking if the user has token
router.use(authController.protect);

// Routes
router
  .route("/")
  .get(itemsController.getAllItems)
  .post(authController.checkIsAdmin, itemsController.postItem);

router
  .route("/:itemId")
  .get(itemsController.getItem)
  .delete(authController.checkIsAdmin, itemsController.deleteItem)
  .patch(authController.checkIsAdmin, itemsController.updateOne);

module.exports = router;
