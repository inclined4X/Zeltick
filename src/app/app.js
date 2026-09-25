const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const healthRoutes = require("../routes/healthRoutes");
const eventRoutes = require("../routes/eventRoutes");
const authRoutes = require("../routes/authRoutes");
const organizerRoutes = require("../routes/organizerRoutes");
const session = require("express-session");
const { sessionSecret, mongodbUri, nodeEnvironment } = require("../config/env");
const { default: MongoStore } = require("connect-mongo");
const { httpLogger } = require("../utils/logger");
const cors = require("cors");
const AppError = require("../errors/appError");
const app = express();

const sessionStore = MongoStore.create({
  mongoUrl: mongodbUri,
});

app.use(httpLogger);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: nodeEnvironment === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use("/", healthRoutes);
app.use("/events", eventRoutes);
app.use("/auth", authRoutes);
app.use("/organizers", organizerRoutes);

app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorHandler);
app.locals.sessionStore = sessionStore;
module.exports = app;
