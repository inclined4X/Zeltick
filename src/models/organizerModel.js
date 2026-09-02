const { default: mongoose, Schema } = require("mongoose");

const organizerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      minLength: 2,
      required: true,
      trim: true,
      maxLength: 100,
    },

    description: {
      type: String,
      minLength: 10,
      maxLength: 2000,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    contactPhone: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    socialLinks: {
      instagram: {
        type: String,
        trim: true,
      },

      twitter: {
        type: String,
        trim: true,
      },

      linkedin: {
        type: String,
        trim: true,
      },

      facebook: {
        type: String,
        trim: true,
      },
    },

    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Organizer = mongoose.model("Organizer", organizerSchema);
module.exports = Organizer;
