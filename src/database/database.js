const mongoose = require("mongoose");
const { mongodbUri } = require("../config/env");
const logger = require("../utils/logger");

const connectDatabase = async function () {
  await mongoose.connect(mongodbUri);
  logger.info("Database is connected");
};

const disconnectDatabase = async function () {
  await mongoose.disconnect();
  logger.info("connection closed");
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
