const { default: mongoose } = require("mongoose");

const ticketTypeSchema = new Schemaa({
  eventId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    miniLength: 2,
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
