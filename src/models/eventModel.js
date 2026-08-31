const { default: mongoose, Schema } = require("mongoose");

const eventSchema = new Schema(
  {
    organizerId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Organizer",
    },

    venueId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Venue",
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 2000,
    },

    startDateTime: {
      type: Date,
      required: true,
    },

    endDateTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
