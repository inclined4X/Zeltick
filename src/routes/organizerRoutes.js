const express = require("express");
const router = express.Router();
const organizerController = require("../controllers/organizerController");
const authenticate = require("../middleware/authenticate");
const organizerValidation = require("../middleware/organizerValidation");
const validate = require("../middleware/validate");

router.post(
  "/become-organizer",
  authenticate,
  organizerValidation.validateBecomeOrganizer,
  validate,
  organizerController.becomeOrganizerController,
);

module.exports = router;
