const express = require("express");
const validateEvent = require("../middleware/eventValidation");
const validate = require("../middleware/validate");
const eventController = require("../controllers/eventController");
const router = express.Router();

router.post("/", validateEvent, validate, eventController);

module.exports = router;
