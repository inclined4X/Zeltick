const { default: mongoose, Schema } = require("mongoose");

const eventSchema = new Schema(
  {
    organizerId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    startDateTime: {
      type: String,
      required: true,
    },

    endDateTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enums: ["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
