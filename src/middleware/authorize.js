const AppError = require("../errors/appError");

const authourize = (role) => (req, res, next) => {
  if (!req.user.roles.includes(role)) {
    return next(
      new AppError("You don't have permission to perform this action", 403),
    );
  }
  next();
};

module.exports = authourize;
