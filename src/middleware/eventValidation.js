const { body } = require("express-validator");

const validateEvent = [
  body("title")
    .trim()
    .notEmpty()
    .bail()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title length should be between 5 to 100 characters"),
  body("description")
    .trim()
    .notEmpty()
    .bail()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),
  body("venueId")
    .notEmpty()
    .bail()
    .withMessage("Id for this field is required")
    .isMongoId()
    .withMessage("Venue ID must be a valid MongoDB ObjectId"),
  body("startDateTime")
    .notEmpty()
    .bail()
    .withMessage("Start date-time is required")
    .isISO8601()
    .withMessage("Start date-time must be in ISO 8601 format"),
  body("endDateTime")
    .notEmpty()
    .bail()
    .withMessage("End date-time is required")
    .isISO8601()
    .withMessage("End date-time must be in ISO 8601 format"),
];

module.exports = validateEvent;
