const { default: mongoose, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      required: [true, "email is required"],
    },

    passwordHash: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      minLength: [2, "First name must be at least 2 characters"],
      maxLength: [50, "First name must not be more than 50 characters"],
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      minLength: [2, "Last name must be at least 2 characters"],
      maxLength: [50, "Last name must not be more than 50 characters"],
      trim: true,
      required: true,
    },

    role: {
      type: String,
      enum: ["attendee", "organizer", "admin", "staff"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "suspended", "deactivated"],
      default: "active",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
