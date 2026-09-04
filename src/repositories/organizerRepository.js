const Organizer = require("../models/organizerModel");

const findOrganizerById = async (organizerId) => {
  return await Organizer.findById(organizerId);
};

const findOrganizerByUserId = async (userId) => {
  return await Organizer.findOne({ userId });
};

module.exports = {
  findOrganizerById,
  findOrganizerByUserId,
};
