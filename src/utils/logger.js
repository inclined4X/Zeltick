const pino = require("pino");
const pinoHttp = require("pino-http");

const { logLevel } = require("../config/env");

const logger = pino({
  level: logLevel,
});
const httpLogger = pinoHttp({ logger });

module.exports = { logger, httpLogger };
