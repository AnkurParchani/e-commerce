const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.checkIsAdmin,
    reviewController.getAllReviews
  )
  .post(authController.protect, reviewController.createReview);

router
  .route("/:reviewId")
  .delete(authController.protect, reviewController.deleteReview);

module.exports = router;
