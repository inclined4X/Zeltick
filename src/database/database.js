const mongoose = require("mongoose");
const { mongodbUri } = require("../config/env");

const connectDatabase = async function () {
  await mongoose.connect(mongodbUri);
  console.log("Database is connected");
};

const disconnectDatabase = async function () {
  await mongoose.disconnect();
  console.log("connection closed");
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
