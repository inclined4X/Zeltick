require("dotenv").config();

const port = Number(process.env.PORT);
const mongodbUri = process.env.MONGODB_URI;

if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error(
    "Invalid configuration: PORT must be an integer between 1024 and 65535",
  );
}

if (typeof mongodbUri !== "string" || mongodbUri.trim() === "") {
  throw new Error(
    "Invalid configuration: MONGODB_URI must be a not non-empty string",
  );
}

const config = {
  port,
  mongodbUri,
};

module.exports = config;
