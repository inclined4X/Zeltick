const { body } = require("express-validator");

const validateCreateTicketType = [
  body("name")
    .exists({ values: "undefined" })
    .withMessage("Ticket type name is required")
    .bail()
    .isString()
    .withMessage("Ticket type name must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Ticket type name must be between 2 and 100 characters"),

  body("price")
    .exists({ values: "undefined" })
    .withMessage("Ticket price is required")
    .bail()
    .isInt({ min: 0, max: Number.MAX_SAFE_INTEGER })
    .withMessage("Ticket price must be a non-negative safe integer in pesewas")
    .bail()
    .toInt(),

  body("quantityTotal")
    .exists({ values: "undefined" })
    .withMessage("Total ticket quantity is required")
    .bail()
    .isInt({ min: 1, max: Number.MAX_SAFE_INTEGER })
    .withMessage("Total ticket quantity must be a positive safe integer")
    .bail()
    .toInt(),

  body().custom((_, { req }) => {
    const allowedFields = ["name", "price", "quantityTotal"];
    const unexpectedFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field),
    );

    if (unexpectedFields.length > 0) {
      throw new Error(`Unexpected field(s): ${unexpectedFields.join(", ")}`);
    }

    return true;
  }),
];

module.exports = { validateCreateTicketType };
