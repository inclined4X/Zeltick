const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const healthRoutes = require("../routes/healthRoutes");
const eventRoutes = require("../routes/eventRoutes");
const authRoutes = require("../routes/authRoutes");
const session = require("express-session");
const { sessionSecret, mongodbUri } = require("../config/env");
const { default: MongoStore } = require("connect-mongo");
const { httpLogger } = require("../utils/logger");
const app = express();

app.use(httpLogger);
app.use(express.json());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongodbUri }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use("/", healthRoutes);
app.use("/events", eventRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);
module.exports = app;
