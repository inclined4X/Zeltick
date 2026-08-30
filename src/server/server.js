const app = require("../app/app");
const { port } = require("../config/env");
const { connectDatabase, disconnectDatabase } = require("../database/database");

const startServer = async function () {
  try {
    await connectDatabase();

    const server = app.listen(port, () => {
      console.log(`Express server is running on port ${port}`);
    });

    let shuttingDown = false;
    const shutdown = () => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log("Shutting down gracefully");
      const forceExit = setTimeout(() => {
        console.error("Forcing shutdown");
        process.exit(1);
      }, 10000);
      server.close(async () => {
        try {
          console.log("Server closed.");
          await disconnectDatabase();
          console.log("Database disconnected");
          console.log("Cleanup complete");
          clearTimeout(forceExit);
          process.exit(0);
        } catch (err) {
          console.error(err);
          process.exit(1);
        }
      });
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
