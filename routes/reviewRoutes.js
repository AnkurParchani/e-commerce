const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(authController.checkIsAdmin, reviewController.getAllReviews)
  .post(reviewController.createReview);

router
  .route("/:reviewId")
  .delete(reviewController.deleteReview)
  .get(authController.checkIsAdmin, reviewController.getOne);

module.exports = router;
