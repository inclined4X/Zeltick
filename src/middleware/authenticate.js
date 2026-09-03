const AppError = require("../errors/appError");
const userRepository = require("../repositories/userRepository");

const authenticate = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return next(new AppError("not authenticated", 401));
    }
    const userId = req.session.userId;

    const user = await userRepository.findUserById(userId);

    if (!user) {
      return next(new AppError("user does not exist", 401));
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
