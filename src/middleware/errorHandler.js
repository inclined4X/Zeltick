const AppError = require("../errors/appError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    req.log.warn({ err }, "Request error");

    return res.status(err.statusCode).json({
      error: true,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err?.code === 11000) {
    req.log.warn({ err }, "Duplicate resource");

    return res.status(409).json({
      error: true,
      message: "A resource with the provided value already exists",
      errors: null,
    });
  }

  req.log.error({ err }, "Request error");

  return res.status(500).json({
    error: true,
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
