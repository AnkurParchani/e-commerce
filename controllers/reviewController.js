const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");

exports.createReview = async (req, res, next) => {
  try {
    // Getting the necessary details
    if (!req.body.stars || !req.body.review || !req.body.item)
      return next(new AppError(400, "Please fill all the necessary details."));

    // Putting the ID of user in review dynamically
    req.body.user = req.user._id;

    // Creating the review
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

    if (reviews.length === 0)
      return next(new AppError(404, "No reviews found."));

    res.status(200).json({ status: "success", reviews });
  } catch (err) {
    console.log("Error from review Controller", err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) return next(new AppError(404, "No review found with this ID"));

    // Checking if the review belongs to the currently logged in user
    if (review.user.toHexString() !== req.user._id.toHexString())
      return next(
        new AppError(401, "You don't have permission to do this action")
      );

    await Review.deleteOne({ _id: req.params.reviewId });

    res.status(204).json({ status: "success", deletedReview: review });
  } catch (err) {
    console.log("Error from deleteReview controller", err);
  }
};
