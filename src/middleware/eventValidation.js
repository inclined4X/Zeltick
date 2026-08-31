const { body } = require("express-validator");

const validateEvent = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title length should be between 5 to 100 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),
  body("venueId")
    .notEmpty()
    .withMessage("Id for this field is required")
    .isObject()
    .withMessage("Has to be an objectId"),
  body("startDateTime")
    .notEmpty()
    .withMessage("Start Date time is requred")
    .isISO8601()
    .withMessage("Date must be in IS08601 format"),
  body("endDateTime")
    .notEmpty()
    .withMessage("Start Date time is requred")
    .isISO8601()
    .withMessage("Date must be in IS08601 format"),
  body("status").default("DRAFT"),
];

module.exports = validateEvent;
