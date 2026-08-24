const app = require("../app/app");

const port = 3000;
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

app.get("/health", (req, res) => {});
