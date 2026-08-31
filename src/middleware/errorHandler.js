const AppError = require("../errors/appError");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: true,
      message: err.message,
      errors: err?.errors,
    });
  }

  return res.status(500).json({
    error: true,
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
