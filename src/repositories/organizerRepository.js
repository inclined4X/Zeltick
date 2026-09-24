const Organizer = require("../models/organizerModel");

const findOrganizerById = async (organizerId) => {
  return await Organizer.findById(organizerId);
};

const findOrganizerByUserId = async (userId) => {
  return await Organizer.findOne({ userId });
};

const createOrganizer = async (organizerData, session) => {
  return await Organizer.create([organizerData], { session });
};

module.exports = {
  findOrganizerById,
  findOrganizerByUserId,
  createOrganizer,
};
