const express = require("express");
const ticketHoldController = require("../controllers/ticketHoldController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate, ticketHoldController.createTicketHold);

module.exports = router;
