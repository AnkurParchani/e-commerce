const express = require("express");
const itemsRoutes = require("./routes/itemsRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// To accept JSON data from postman
app.use(express.json());

// APIs to all different routes
app.use("/items", itemsRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

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
