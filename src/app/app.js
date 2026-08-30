const express = require("express");
const AppError = require("../errors/appError");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: Date.now(),
  });
});

app.get("/test-error", (req, res, next) => {
  next(new AppError("Test error", 400));
});

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
};

app.use(errorHandler);
module.exports = app;
