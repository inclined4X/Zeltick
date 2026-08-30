const { body } = require("express-validator");

const validateEvent = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 6, max: 300 })
    .withMessage("Title length should be between 6 to 500 characters")
    .notEmpty()
    .withMessage("title is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters")
    .notEmpty()
    .withMessage("description is required"),
];

module.exports = validateEvent;
