const express = require("express");
const authValidation = require("../middleware/authValidation");
const validate = require("../middleware/validate");
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post(
  "/signup",
  authValidation.validateAuthSignup,
  validate,
  authController.signup,
);

router.post(
  "/login",
  authValidation.validateAuthLogin,
  validate,
  authController.login,
);

router.get("/me", authenticate, authController.me);

module.exports = router;
