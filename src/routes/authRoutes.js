const express = require("express");
const authValidation = require("../middleware/authValidation");
const validate = require("../middleware/validate");
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");
const rateLimiter = require("../middleware/rateLimiter");

const router = express.Router();

router.post(
  "/signup",
  authValidation.validateAuthSignup,
  validate,
  authController.signup,
);

router.post(
  "/login",
  rateLimiter.loginLimiter,
  authValidation.validateAuthLogin,
  validate,
  authController.login,
);

router.get("/me", authenticate, authController.me);
router.get("/verify-email", authController.verifyEmail);

router.post(
  "/resend-verification",
  authenticate,
  authController.resendVerificationEmail,
);

module.exports = router;
