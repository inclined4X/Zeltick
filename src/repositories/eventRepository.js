const Event = require("../models/eventModel");

const eventRepository = async (eventData) => {
  return await Event.create(eventData);
};

module.exports = eventRepository;
