const Event = require("../models/eventModel");

const createEventRepository = async (eventData) => {
  return await Event.create(eventData);
};

const findEventById = async (id) => {
  return await Event.findById(id);
};

const findPublishedEvents = async () => {
  return await Event.find({
    status: "PUBLISHED",
    wasEverPublished: true,
  })
    .populate("organizerId", "name description logo website socialLinks")
    .populate("venueId", "name location");
};

const findPublicEventById = async (id) => {
  return await Event.findOne({
    _id: id,
    wasEverPublished: true,
    status: { $in: ["PUBLISHED", "CANCELLED", "COMPLETED"] },
  })
    .populate("organizerId", "name description logo website socialLinks")
    .populate("venueId", "name location");
};

const findEventByIdAndDelete = async (id) => {
  return await Event.findByIdAndDelete(id);
};

module.exports = {
  createEventRepository,
  findPublishedEvents,
  findPublicEventById,
  findEventById,
};
