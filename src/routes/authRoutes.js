const express = require("express");
const authValidation = require("../middleware/authValidation");
const validate = require("../middleware/validate");
const authController = require("../controllers/authController");
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

module.exports = router;
