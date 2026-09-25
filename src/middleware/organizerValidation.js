const { body } = require("express-validator");

const validateBecomeOrganizer = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organizer name is required")
    .bail()
    .isString()
    .withMessage("Organizer name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Organizer name character length must be between 2 and 100"),

  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description character length must be between 10 and 2000"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail(),

  body("contactPhone")
    .optional()
    .trim()
    .isString()
    .withMessage("Contact phone must be a string"),

  body("logo")
    .optional()
    .trim()
    .isURL()
    .withMessage("Logo must be a valid URL"),

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
    .withMessage("Twitter must be a valid URL"),

  body("socialLinks.linkedin")
    .optional()
    .trim()
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),

  body("socialLinks.facebook")
    .optional()
    .trim()
    .isURL()
    .withMessage("Facebook must be a valid URL"),
];

module.exports = { validateBecomeOrganizer };
