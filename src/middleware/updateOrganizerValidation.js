const { body } = require("express-validator");

const updateOrganizerValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body(description)
    .optional()
    .isString()
    .withMessage("Desription must be a string")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("contactPhone")
    .optional()
    .trim()
    .isString()
    .withMessage("Contact phone must be a string"),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL"),
];
