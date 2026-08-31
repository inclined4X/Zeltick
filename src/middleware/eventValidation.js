const { body } = require("express-validator");

const validateEvent = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title length should be between 6 to 500 characters")
    .notEmpty()
    .withMessage("title is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 500 characters")
    .notEmpty()
    .withMessage("description is required"),
  body("organizerId")
    .notEmpty()
    .withMessage("Organizer Id is required")
    .isInt({ min: 1 })
    .withMessage("Id must be a positive integer"),
  body("venueId")
    .notEmpty()
    .withMessage("Id for this field is required")
    .isInt({ min: 1 })
    .withMessage("Id must be a positive integer"),
  body("startDateTime")
    .notEmpty()
    .withMessage("Start Date time is requred")
    .isISO8601()
    .isDate({ format: "YYYY/MM/DD", delimiters: ["/"] })
    .withMessage("Must be a valid date in YYYY/MM/DD format"),
  body("endDateTime")
    .notEmpty()
    .withMessage("Start Date time is requred")
    .isISO8601()
    .isDate({ format: "YYYY/MM/DD", delimiters: ["/"] })
    .withMessage("Must be a valid date in YYYY/MM/DD format"),
  body("status")
    .notEmpty()
    .withMessage("Start Date time is requred")
    .isIn(["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"])
    .default("DRAFT"),
];

module.exports = validateEvent;
