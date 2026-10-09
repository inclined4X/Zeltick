const mongoose = require("mongoose");

const ticketTypeSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      minLength: 2,
      maxLength: 100,
      trim: true,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isSafeInteger,
        message: "Price must be a safe integer in pesewas",
      },
      min: [0, "Price cannot be negative"],
    },

    quantityTotal: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isSafeInteger,
        message: "Total quantity must be a safe integer",
      },
      min: [1, "Total capacity must be at least one"],
    },

    quantityHeld: {
      type: Number,
      default: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Held quantity must be a safe integer",
      },
      min: [0, "Held quantity cannot be negative"],
    },

    quantitySold: {
      type: Number,
      default: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Sold quantity must be a safe integer",
      },
      min: [0, "Sold quantity cannot be negative"],
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ticketTypeSchema.index({ eventId: 1, name: 1 }, { unique: true });

ticketTypeSchema.virtual("quantityAvailable").get(function () {
  return this.quantityTotal - this.quantityHeld - this.quantitySold;
});

const TicketType = mongoose.model("TicketType", ticketTypeSchema);

module.exports = TicketType;
