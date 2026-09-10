const Event = require("../models/eventModel");

const eventRepository = async (eventData) => {
  return await Event.create(eventData);
};

const findPublishedEvents = async () => {
  return await Event.find({ status: "PUBLISHED", wasEverPublished: true });
};

module.exports = eventRepository;
