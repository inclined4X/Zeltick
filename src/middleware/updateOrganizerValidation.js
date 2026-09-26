const { body } = require("express-validator");

const updateOrganizerValidation = [
  body("name")
    .optional({ nullable: false })
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("description")
    .optional({ nullable: false })
    .isString()
    .withMessage("Desription must be a string")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("contactPhone")
    .optional({ nullable: false })
    .trim()
    .isString()
    .withMessage("Contact phone must be a string"),

  body("website")
    .optional({ nullable: false })
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL"),

  body("logo")
    .optional({ nullable: false })
    .trim()
    .isURL()
    .withMessage("Logo must be a valid URL"),

  body("socialLinks")
    .optional({ nullable: false })
    .isObject()
    .withMessage("Social links must be an object"),

  body("socialLinks.instagram")
    .optional({ nullable: false })
    .trim()
    .isURL()
    .withMessage("Instagram must be a valid URL"),

  body("socialLinks.twitter")
    .optional({ nullable: false })
    .trim()
    .isURL()
    .withMessage("Instagram must be a valid URL"),

  body("socialLinks.linkedin")
    .optional({ nullable: false })
    .trim()
    .isURL()
    .withMessage("Linkedin must be a valid URL"),

  body("socialLinks.facebook")
    .optional({ nullable: false })
    .trim()
    .isURL()
    .withMessage("facebook must be a valid URL"),

  body("email")
    .optional({ nullable: false })
    .trim()
    .isEmail()
    .withMessage("email must be valid")
    .normalizeEmail(),
];

module.exports = updateOrganizerValidation;
