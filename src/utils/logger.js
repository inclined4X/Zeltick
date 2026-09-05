const pino = require("pino");
const pinoHttp = require("pino-http");

const { logLevel, nodeEnvironment } = require("../config/env");

const isProduction = nodeEnvironment === "production";

const logger = pino({
  level: logLevel,
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          translateTime: "SYS:dd-mm-yy HH:MM:ss",
          colorize: true,
          ignore: "pid,hostname",
        },
      },
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
