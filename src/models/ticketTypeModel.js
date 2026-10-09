const { default: mongoose, Schema } = require("mongoose");

const ticketTypeSchema = new Schema(
  {
    eventId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: Event,
    },

    name: {
      type: String,
      minLength: 2,
      required: true,
      trim: true,
      maxLength: 100,
    },

    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return Number.isInteger(v);
        },
      },
      min: [0, "Price must be a positive number"],
    },

    quantityTotal: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return Number.isInteger(v);
        },
      },
      min: [0, "Quantity total must be a positive number"],
    },

    quantityHeld: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return Number.isInteger(v);
        },
      },
      min: [0, "Quantity held must be a positive number"],
    },

    quantitySold: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return Number.isInteger(v);
        },
      },
      min: [0, "Quantity sold must be a positive number"],
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const TicketType = mongoose.model("TicketType", ticketTypeSchema);
module.exports = TicketType;
