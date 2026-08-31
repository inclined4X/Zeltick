const express = require("express");
const validateEvent = require("../middleware/eventValidation");
const validate = require("../middleware/validate");
const router = express.Router();

router.post("/", validateEvent, validate, (req, res) => {
  res.status(200).json({
    message: "Validation passed",
  });
});

module.exports = router;
