const express = require("express");
const router = express.Router();
const organizerController = require("../controllers/organizerController");
const authenticate = require("../middleware/authenticate");
const organizerValidation = require("../middleware/organizerValidation");
const validate = require("../middleware/validate");
const authourize = require("../middleware/authorize");

router.post(
  "/",
  authenticate,
  organizerValidation.validateBecomeOrganizer,
  validate,
  organizerController.becomeOrganizerController,
);

router.get(
  "/me",
  authenticate,
  authourize("organizer"),
  organizerController.getMyOrganizerProfileController,
);

router.patch(
  "/me",
  authenticate,
  authourize("organizer"),
  organizerValidation.updateOrganizerValidation,
  validate,
  organizerController.updateOrganizerController,
);

router.get("/verify-email", organizerController.verifyOrganizerEmailController);

router.post(
  "/me/email/resend-verification",
  authenticate,
  authourize("organizer"),
  organizerController.resendOrganizerVerificationEmailController,
);

router.patch(
  "/me/email",
  authenticate,
  authourize("organizer"),
  organizerValidation.updateOrganizerEmailValidation,
  validate,
  organizerController.updateOrganizerEmailController,
);

module.exports = router;
