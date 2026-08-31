const Event = require("../models/eventModel");

const test = async () => {
  try {
    await Event.create({
      venueId: "507f1f77bcf86cd799439011",
      title: "The Developers Union",
      description: "A conference for developers and software engineers.",
      startDateTime: new Date("2026-12-20T10:00:00Z"),
      endDateTime: new Date("2026-12-20T18:00:00Z"),
    });
  } catch (err) {
    console.error(err.message);
  }
};

test();
