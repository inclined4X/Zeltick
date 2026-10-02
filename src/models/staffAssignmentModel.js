const { default: mongoose, Schema } = require("mongoose");

const staffAssignmentSchema = new Schema(
  {
    organizerId: {
      type: Schema.ObjectId,
      ref: "Organizer",
      required: true,
    },

    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },

    eventId: {
      type: Schema.ObjectId,
      ref: "Event",
      default: null,
    },

    role: {
      type: String,
      enum: ["manager", "ticket_seller", "check_in_staff"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "revoked"],
      default: "active",
      required: true,
    },

    addedBy: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },

    revokedAt: {
      type: Date,
      default: null,
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
