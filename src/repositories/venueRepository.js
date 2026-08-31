const Venue = require("../models/venueModel");

const findVenueById = async (venueId) => {
  return await Venue.findById(venueId);
};

module.exports = {
  findVenueById,
};
