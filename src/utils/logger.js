const pino = require("pino");
const pinoHttp = require("pino-http");

const { logLevel } = require("../config/env");

const logger = pino({
  level: logLevel,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      'res.headers["set-cookie"]',
    ],
    censor: "[REDACTED]",
  },
});
const httpLogger = pinoHttp({ logger });

module.exports = { logger, httpLogger };
