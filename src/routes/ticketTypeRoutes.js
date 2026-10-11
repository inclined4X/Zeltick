const express = require("express");
const ticketTypeController = require("../controllers/ticketTypeController");
const authenticate = require("../middleware/authenticate");
const ticketTypeValidation = require("../middleware/ticketTypeValidation");
const { validate } = require("../models/ticketTypeModel");
const router = express.router();

router.post(
  "/events/:eventId/ticket-types",
  authenticate,
  ticketTypeValidation.validateCreateTicketType,
  validate,
  ticketTypeController.createTicketType,
);

router.get(
  "/events/:eventId/ticket-types",
  ticketTypeController.listPublicEventTicketTypes,
);

module.exports = router;
