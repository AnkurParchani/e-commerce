const express = require("express");
const authController = require("./../controllers/authController");
const addressController = require("./../controllers/addressController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(authController.checkIsAdmin, addressController.getAllAddress)
  .post(addressController.addAddress);

router
  .route("/:addressId")
  .get(addressController.getOneAddress)
  .delete(addressController.deleteAddress);

module.exports = router;
