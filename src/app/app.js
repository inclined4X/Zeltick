const express = require("express");
const errorHandler = require("../middleware/errorHandler");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: Date.now(),
  });
});

app.use(errorHandler);
module.exports = app;
