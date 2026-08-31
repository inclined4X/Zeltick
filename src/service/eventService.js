const eventRepository = require("../repositories/eventRepository");

const createEvent = async (eventData) => {
  return await eventRepository(eventData);
};

module.exports = {
  createEvent,
};
