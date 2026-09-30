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

const findOrganizerByHashedToken = async (emailChangeTokenHash) => {
  return await Organizer.findOne({ emailChangeTokenHash }).select(
    "+emailChangeTokenHash",
  );
};

module.exports = {
  findOrganizerById,
  findOrganizerByUserId,
  createOrganizer,
  findOrganizerByHashedToken,
};
