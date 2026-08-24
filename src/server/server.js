const app = require("../app/app");
const { port } = require("../config/env");
const database = require("../database/database");

const startServer = async function () {
  await database();

  app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
  });
};

startServer();
