const { rateLimit } = require("express-rate-limit");

const AppError = require("../errors/appError");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (req, res, next) => {
    next(new AppError("Too many login attempts, please try again later.", 429));
  },
});

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  handler: (req, res, next) => {
    next(
      new AppError("Too many signup attempts, please try again later.", 429),
    );
  },
});

const resendLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  handler: (req, res, next) => {
    next(
      new AppError(
        "Too many verification resend requests, please try again later.",
        429,
      ),
    );
  },
});

module.exports = { loginLimiter, signupLimiter, resendLimiter };
