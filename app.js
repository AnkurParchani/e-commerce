const express = require("express");
const cors = require("cors");

const itemsRoutes = require("./routes/itemsRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishListRoutes = require("./routes/wishListRoutes");

const app = express();

// Important packages
app.use(cors());

// To accept JSON data from postman
app.use(express.json());

// APIs to all different routes
app.use("/items", itemsRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);
app.use("/address", addressRoutes);
app.use("/wishlist", wishListRoutes);

// Error handling middleware for appError
app.use((err, req, res, next) => {
  err.status = err.status || "fail";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Sending to server.js
module.exports = app;
