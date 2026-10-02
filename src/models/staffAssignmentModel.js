const mongoose = require("mongoose");

const staffAssignmentSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    scope: {
      type: String,
      enum: ["organizer", "event"],
      required: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },

    role: {
      type: String,
      enum: ["check_in", "ticket_seller", "manager"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "revoked"],
      default: "active",
      required: true,
    },

    revokedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const StaffAssignment = mongoose.model(
  "StaffAssignment",
  staffAssignmentSchema,
);

module.exports = StaffAssignment;
