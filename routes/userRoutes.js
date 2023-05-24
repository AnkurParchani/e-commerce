const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getAllUsers).post(userController.postUser);

router
  .route("/:userId")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateOne);

module.exports = router;
