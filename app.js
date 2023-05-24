const express = require("express");
const itemsRoutes = require("./routes/itemsRoutes");

const app = express();

// To accept JSON data from postman
app.use(express.json());

app.use("/items", itemsRoutes);

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
