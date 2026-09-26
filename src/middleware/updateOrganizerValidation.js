const { body } = require("express-validator");

const updateOrganizerValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("description")
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

  body("socialLinks")
    .optional()
    .isObject()
    .withMessage("Social links must be an object"),

  body("socialLinks.instagram")
    .optional()
    .trim()
    .isURL()
    .withMessage("Instagram must be a valid URL"),

  body("socialLinks.twitter")
    .optional()
    .trim()
    .isURL()
    .withMessage("Instagram must be a valid URL"),

  body("socialLinks.linkedin")
    .optional()
    .trim()
    .isURL()
    .withMessage("Linkedin must be a valid URL"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("email must be valid")
    .normalizeEmail(),
];
