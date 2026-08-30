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
      server.close(async () => {
        try {
          console.log("Server closed. Cleanup complete.");
          await disconnectDatabase();
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
  }
};

startServer();
