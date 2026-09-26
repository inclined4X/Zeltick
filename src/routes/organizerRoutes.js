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

module.exports = router;
