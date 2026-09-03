const express = require("express");
const validateEvent = require("../middleware/eventValidation");
const validate = require("../middleware/validate");
const eventController = require("../controllers/eventController");
const authourize = require("../middleware/authourize");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post(
  "/",
  validateEvent,
  validate,
  authenticate,
  authourize("organizer"),
  eventController,
);

module.exports = router;
