const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.route("/signup").post(authController.signup);
router.route("/login").get(authController.login);

router
  .route("/:userId")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateOne);

module.exports = router;
