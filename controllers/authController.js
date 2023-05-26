const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

exports.signup = async (req, res, next) => {
  try {
    // Signing in the user
    const user = await User.create(req.body);

    // Creating the token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    console.log("Error from post user", err);
  }
};

exports.login = async (req, res, next) => {
  // If there's no email or password provided
  if (!req.body.email || !req.body.password)
    return next(new AppError(400, "Please provide both email and password"));

  // Finding the user with the provided credentials
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  //   If no user is found
  if (!user) return next(new AppError(401, "Incorrect email or password"));

  //   If the user is found then making token for the logged in user
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({ status: "success", token });
};

exports.protect = async (req, res, next) => {
  // Getting the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError(401, "User unauthorized"));

  //   Decoding the jwt token
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  //   Getting the user from the decoded Id
  req.user = await User.findOne({ _id: decode.userId });

  if (!req.user)
    return next(
      new AppError(
        500,
        "Something went wrong with the token, please try again later. Error coming from authController.protect"
      )
    );

  next();
};

exports.checkIsAdmin = async (req, res, next) => {
  // Converting objectId to string because mongoose returns id in new object form and id is saved in string format in process.env.
  if (
    req.user._id.toHexString() === process.env.ADMIN_ID &&
    req.user.password === process.env.ADMIN_PASSWORD
  ) {
    // Means the user is Admin
    next();
  } else {
    return next(
      new AppError(401, "You're unauthorized to perform this action!")
    );
  }
};
