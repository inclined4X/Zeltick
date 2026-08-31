const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const healthRoutes = require("../routes/healthRoutes");
const eventRoutes = require("../routes/eventRoutes");

const app = express();
app.use(express.json());

app.use("/", healthRoutes);
app.use("/events", eventRoutes);

app.use(errorHandler);
module.exports = app;
