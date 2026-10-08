const { default: mongoose } = require("mongoose");

const ticketTypeSchema = new Schema({
  eventId: {
    type: mongoose.Schema.ObjectId,
    required: true,
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
});
