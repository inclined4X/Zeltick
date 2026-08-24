const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: Date.now(),
  });
});

module.exports = app;
