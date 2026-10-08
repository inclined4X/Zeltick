const { default: mongoose } = require("mongoose");

const ticketTypeSchema = new Schemaa({
  eventId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },

  name: {},
});
