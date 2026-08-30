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

app.use(errorHandler);
module.exports = app;
