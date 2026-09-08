require("dotenv").config();

const port = Number(process.env.PORT);
const mongodbUri = process.env.MONGODB_URI;
const sessionSecret = process.env.SESSION_SECRET;
const logLevel = process.env.LOG_LEVEL || "info";
const nodeEnvironment = process.env.NODE_ENV || "development";
const resendApiKey = process.env.RESEND_APIKEY;
const appBaseUrl = process.env.APP_BASE_URL;

if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error(
    "Invalid configuration: PORT must be an integer between 1024 and 65535",
  );
}

if (typeof mongodbUri !== "string" || mongodbUri.trim() === "") {
  throw new Error(
    "Invalid configuration: MONGODB_URI must not be a non-empty string",
  );
}

if (!sessionSecret) {
  throw new Error("Session secret is required");
}

if (
  nodeEnvironment !== "development" &&
  nodeEnvironment !== "test" &&
  nodeEnvironment !== "production"
) {
  throw new Error(
    "Invalid node environment. Node environment must be development or test or production",
  );
}

if (!resendApiKey) {
  throw new Error("Resend API does not exist");
}

if (!appBaseUrl) {
  throw new Error("App base URL does not exist");
}

const config = {
  port,
  mongodbUri,
  sessionSecret,
  logLevel,
  nodeEnvironment,
  resendApiKey,
  appBaseUrl,
};

module.exports = config;
