const mongoose = require("mongoose");

const ticketHoldItemSchema = new mongoose.Schema(
  {
    ticketTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketType",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isSafeInteger,
        message: "Hold quantity must be a safe integer",
      },
      min: [1, "Hold quantity must be at least one"],
    },

    unitPrice: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isSafeInteger,
        message: "Unit price must be a safe integer in pesewas",
      },
      min: [0, "Unit price cannot be negative"],
    },
  },
  {
    _id: false,
  },
);

const ticketHoldSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    items: {
      type: [ticketHoldItemSchema],
      required: true,
      validate: [
        {
          validator: (items) => Array.isArray(items) && items.length > 0,
          message: "A hold must contain at least one ticket type",
        },
        {
          validator: (items) => {
            const ticketTypeIds = items.map((item) =>
              item.ticketTypeId.toString(),
            );

            return new Set(ticketTypeIds).size === ticketTypeIds.length;
          },
          message: "A hold cannot contain duplicate ticket types",
        },
      ],
    },

    status: {
      type: String,
      enum: ["active", "converted", "expired", "released"],
      default: "active",
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ticketHoldSchema.index({
  status: 1,
  expiresAt: 1,
});

ticketHoldSchema.index({
  userId: 1,
  status: 1,
});

const TicketHold = mongoose.model("TicketHold", ticketHoldSchema);

module.exports = TicketHold;
