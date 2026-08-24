const app = require("../app/app");
const { port } = require("../config/env");
const database = require("../database/database");

const startServer = async function () {
  try {
    await database();

    app.listen(port, () => {
      console.log(`Express server is running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
