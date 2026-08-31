const { default: mongoose, Schema } = require("mongoose");

const venueSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 5,
      maxLength: 200,
    },

    capacity: {
      type: Number,
      required: true,
      min: [1, "Value must be a positive number"],
      validate: {
        validator: function (v) {
          // Number.isInteger returns true for 5, false for 5.5
          return Number.isInteger(v);
        },
        message: (props) => `${props.value} is not an integer`,
      },
    },

    location: {
      type: String,
      trim: true,
      required: true,
      minLength: 5,
      maxLength: 200,
    },
  },
  { timestamps: true },
);

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
