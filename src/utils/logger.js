const pino = require("pino");
const { logLevel } = require("../config/env");

const logger = pino({
  level: logLevel || "info",
});

module.exports = logger;
