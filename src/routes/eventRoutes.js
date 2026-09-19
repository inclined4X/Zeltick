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
  eventController.createEventController,
);

router.get("/", eventController.getPublishedEventsController);

router.get("/:id", eventController.getPublicEventByIdController);

router.delete(
  "/:id",
  authenticate,
  authourize("organizer"),
  eventController.deleteEventController,
);

router.post(
  "/:id/publish",
  authenticate,
  authourize("organizer"),
  eventController.publishEventController,
);

router.post(
  "/:id/cancel",
  authenticate,
  authourize("organizer"),
  eventController.cancelEventController,
);

router.post(
  "/:id/complete",
  authenticate,
  authourize("organizer"),
  eventController.completeEventController,
);

module.exports = router;
