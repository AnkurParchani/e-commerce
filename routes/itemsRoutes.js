const express = require("express");

const itemsController = require("../controllers/itemsController");

const router = express.Router();

router
  .route("/")
  .get(itemsController.getAllItems)
  .post(itemsController.postItem);

router.route("/:itemId").get(itemsController.getItem);

module.exports = router;
