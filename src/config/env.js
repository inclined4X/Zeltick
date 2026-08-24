require("dotenv").config();

const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error(
    "Invalid configuration: PORT must be an integer between 1024 and 65535",
  );
}

const config = {
  port,
};

module.exports = config;
