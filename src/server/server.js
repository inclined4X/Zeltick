const app = require("../app/app");
const { port } = require("../config/env");

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
