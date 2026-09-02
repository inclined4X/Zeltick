const Organizer = require("../models/organizerModel");

const findOrganizerById = async (organizerId) => {
  return await Organizer.findById(organizerId);
};

module.exports = {
  findOrganizerById,
};
