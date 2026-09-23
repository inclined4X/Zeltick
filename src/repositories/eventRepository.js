const Event = require("../models/eventModel");

const createEventRepository = async (eventData) => {
  return await Event.create(eventData);
};

const findEventById = async (id) => {
  return await Event.findById(id);
};

const findPublishedEvents = async ({ limit, cursor }) => {
  const query = {
    status: "PUBLISHED",
  };

  if (cursor) {
    query.$or = [
      {
        startDateTime: {
          $gt: cursor.startDateTime,
        },
      },
      {
        startDateTime: cursor.startDateTime,
        _id: {
          $gt: cursor.id,
        },
      },
    ];
  }

  return await Event.find(query)
    .populate("organizerId", "name description logo website socialLinks")
    .populate("venueId", "name location")
    .sort({
      startDateTime: 1,
      _id: 1,
    })
    .limit(limit + 1);
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
  findEventByIdAndDelete,
};
