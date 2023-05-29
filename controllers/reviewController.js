const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");
const ApiFeatures = require("./../utils/apiFeatures");

// Checking if the user is doing his action and not of any other user.
function checkCurrentUser(userId, actionUserId, next) {
  return new Promise((resolve, reject) => {
    if (userId !== actionUserId) {
      reject(
        next(new AppError(401, "You are not authorized to do this action"))
      );
    } else {
      resolve();
    }
  });
}

// HTTP Methods
exports.getAllReviews = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Review.find(), req.query)
      .filter()
      .sort()
      .pagination()
      .limitFields();

    const reviews = await features.query;

    if (reviews.length === 0)
      return next(new AppError(404, "No reviews found."));

    res
      .status(200)
      .json({ status: "success", results: reviews.length, reviews });
  } catch (err) {
    console.log("Error from review Controller", err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) return next(new AppError(404, "No review found with this ID"));

    res.status(200).json({ status: "success", review });
  } catch (err) {
    console.log("Error from reviewController getOne", err);
  }
};

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

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) return next(new AppError(404, "No review found with this ID"));

    // Checking if the review belongs to the currently logged in user
    await checkCurrentUser(
      review.user.toHexString(),
      req.user._id.toHexString(),
      next
    );

    await Review.deleteOne({ _id: req.params.reviewId });

    res.status(204).json({ status: "success", deletedReview: review });
  } catch (err) {
    console.log("Error from deleteReview controller", err);
  }
};
