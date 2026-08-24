const mongoose = require("mongoose");
const { mongodbUri } = require("../config/env");

const database = async function () {
  await mongoose.connect(mongodbUri);
  console.log("Database is connected");
};

module.exports = database;
