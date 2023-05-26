const express = require("express");

const authController = require("./../controllers/authController");
const itemsController = require("../controllers/itemsController");

const router = express.Router();

// Checking if the user has token
router.use(authController.protect);

// To check isAdmin(true) before doing any action
router.use(authController.checkIsAdmin);

// Routes
router
  .route("/")
  .get(itemsController.getAllItems)
  .post(itemsController.postItem);

router
  .route("/:itemId")
  .get(itemsController.getItem)
  .delete(itemsController.deleteItem)
  .patch(itemsController.updateOne);

module.exports = router;
