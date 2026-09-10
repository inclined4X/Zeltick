const Event = require("../models/eventModel");

const createEventRepository = async (eventData) => {
  return await Event.create(eventData);
};

const findPublishedEvents = async () => {
  return await Event.find({ status: "PUBLISHED", wasEverPublished: true });
};

const findPublicEventById = async (id) => {
  return await Event.findOne({
    _id: id,
    wasEverPublished: true,
    status: { $in: ["PUBLISHED", "CANCELLED", "COMPLETED"] },
  });
};

module.exports = {
  createEventRepository,
  findPublishedEvents,
  findPublicEventById,
};
