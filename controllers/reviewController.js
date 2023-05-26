const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");

exports.createReview = async (req, res, next) => {
  try {
    if (!req.body.stars || !req.body.review)
      return next(new AppError(400, "Please provide both ratings and reivew."));

    !req.body.item &&
      next(new AppError(400, "Tell us which product it belongs to."));

    const review = await Review.create(req.body);

    res.status(200).json({
      status: "success",
      review,
    });
  } catch (err) {
    console.log("Review controller error", err);
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();

    reviews.length < 1 && next(404, "No reviews found.");

    res.status(200).json({ status: "success", reviews });
  } catch (err) {
    console.log("Error from review Controller", err);
  }
};
