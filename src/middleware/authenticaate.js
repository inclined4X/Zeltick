const AppError = require("../errors/appError");

const authenticate = async (req, res, next) => {
  if (!req.session.userId) {
    return next(new AppError("not authenticated", 401));
  }
  req.userId = req.session.userId;
  req.roles = req.session.roles;
  next();
};

module.exports = authenticate;
