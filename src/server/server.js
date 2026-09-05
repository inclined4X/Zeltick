const app = require("../app/app");
const { port } = require("../config/env");
const { connectDatabase, disconnectDatabase } = require("../database/database");
const logger = require("../utils/logger");

const startServer = async function () {
  try {
    await connectDatabase();

    const server = app.listen(port, () => {
      logger.info({ port }, `Express server is running`);
    });

    let shuttingDown = false;
    const shutdown = () => {
      if (shuttingDown) return;
      shuttingDown = true;
      logger.info("Shutting down gracefully");
      const forceExit = setTimeout(() => {
        logger.error("Forcing shutdown");
        process.exit(1);
      }, 10000);
      server.close(async () => {
        try {
          logger.info("Server closed.");
          await disconnectDatabase();
          logger.info("Database disconnected");
          logger.info("Cleanup complete");
          clearTimeout(forceExit);
          process.exit(0);
        } catch (err) {
          logger.error(err);
          process.exit(1);
        }
      });
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

startServer();
