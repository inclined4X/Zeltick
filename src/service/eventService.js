const { default: mongoose } = require("mongoose");
const AppError = require("../errors/appError");
const eventRepository = require("../repositories/eventRepository");
const organizerRepository = require("../repositories/organizerRepository");
const venueRepository = require("../repositories/venueRepository");

const toPublicEvent = (event) => {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    status: event.status,

    venue: event.venueId
      ? {
          name: event.venueId.name,
          location: event.venueId.location,
        }
      : null,

    organizer: event.organizerId
      ? {
          name: event.organizerId.name,
          description: event.organizerId.description,
          logo: event.organizerId.logo,
          website: event.organizerId.website,
          socialLinks: event.organizerId.socialLinks,
        }
      : null,
  };
};

const createEvent = async (eventData, userId) => {
  const { startDateTime, endDateTime, venueId } = eventData;
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const now = new Date();

  if (isNaN(start) || isNaN(end)) {
    throw new AppError("Invalid date format", 400);
  }

  if (start >= end)
    throw new AppError(
      "The start date-time cant be greater than the end date time",
      400,
    );

  if (start < now) throw new AppError("Date cannot be in the past", 400);

  const venue = await venueRepository.findVenueById(venueId);

  if (!venue) {
    throw new AppError("Venue does not exist", 404);
  }

  const organizer = await organizerRepository.findOrganizerByUserId(userId);

  if (!organizer) {
    throw new AppError("organizer does not exist", 404);
  }

  const eventDataWithOrganizerId = {
    ...eventData,
    organizerId: organizer._id,
  };

  return await eventRepository.createEventRepository(eventDataWithOrganizerId);
};

const getPublishedEvents = async () => {
  const events = await eventRepository.findPublishedEvents();

  return events.map(toPublicEvent);
};

const getPublicEventById = async (id) => {
  if (!id) {
    throw new AppError("ID does not exist or invalid", 400);
  }

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("ID is invalid", 400);
  }

  const event = await eventRepository.findPublicEventById(id);

  if (!event) {
    throw new AppError("Event does not exist", 404);
  }

  return toPublicEvent(event);
};

module.exports = {
  createEvent,
  getPublishedEvents,
  getPublicEventById,
};
