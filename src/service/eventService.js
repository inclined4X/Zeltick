const eventRepository = require("../repositories/eventRepository");

const createEvent = async (eventData) => {
  const event = await eventRepository(eventData);

  return event;
};

module.exports = {
  createEvent,
};
