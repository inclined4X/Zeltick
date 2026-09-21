const updateEventValidation = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("startDateTime")
    .optional()
    .isISO8601()
    .withMessage("Start date-time must be a valid ISO 8601 date"),

  body("endDateTime")
    .optional()
    .isISO8601()
    .withMessage("End date-time must be a valid ISO 8601 date"),

  body("venueId").optional().isMongoId().withMessage("Venue ID must be valid"),
];

module.exports = updateEventValidation;
