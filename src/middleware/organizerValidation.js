const { body, checkExact } = require("express-validator");

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
    .not()
    .exists()
    .withMessage("Email must not be provided when becoming an organizer"),

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

const updateOrganizerValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("description")
    .optional({ values: "null" })
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("contactPhone")
    .optional({ values: "null" })
    .isString()
    .withMessage("Contact phone must be a string")
    .trim(),

  body("logo")
    .optional({ values: "null" })
    .isString()
    .withMessage("Logo must be a string")
    .trim()
    .isURL()
    .withMessage("Logo must be a valid URL"),

  body("website")
    .optional({ values: "null" })
    .isString()
    .withMessage("Website must be a string")
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL"),

  body("socialLinks")
    .optional({ values: "null" })
    .isObject()
    .withMessage("Social links must be an object"),

  body("socialLinks.instagram")
    .optional({ values: "null" })
    .isString()
    .withMessage("Instagram must be a string")
    .trim()
    .isURL()
    .withMessage("Instagram must be a valid URL"),

  body("socialLinks.twitter")
    .optional({ values: "null" })
    .isString()
    .withMessage("Twitter must be a string")
    .trim()
    .isURL()
    .withMessage("Twitter must be a valid URL"),

  body("socialLinks.linkedin")
    .optional({ values: "null" })
    .isString()
    .withMessage("LinkedIn must be a string")
    .trim()
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),

  body("socialLinks.facebook")
    .optional({ values: "null" })
    .isString()
    .withMessage("Facebook must be a string")
    .trim()
    .isURL()
    .withMessage("Facebook must be a valid URL"),
];

const updateOrganizerEmailValidation = [
  checkExact(
    [
      body("email")
        .trim()
        .isEmail()
        .withMessage("Email must be a valid email")
        .normalizeEmail(),
    ],
    {
      message: `only email field is allowed`,
    },
  ),
];

module.exports = {
  validateBecomeOrganizer,
  updateOrganizerValidation,
  validateEmail,
  updateOrganizerEmailValidation,
};
