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

const EVENT_UPDATE_ALLOWED_STATUSES = ["DRAFT"];

const EDITABLE_EVENT_FIELDS = [
  "title",
  "description",
  "startDateTime",
  "endDateTime",
  "venueId",
];

const updateEvent = async (userId, eventId, updateData) => {
  const event = await eventRepository.findEventById(eventId);

  if (!event) {
    throw new AppError("Event does not exist", 404);
  }

  const organizer = await organizerRepository.findOrganizerByUserId(userId);

  if (!organizer) {
    throw new AppError("Organizer does not exist", 404);
  }

  if (!event.organizerId.equals(organizer._id)) {
    throw new AppError("You do not have permission to modify this event", 403);
  }

  if (!EVENT_UPDATE_ALLOWED_STATUSES.includes(event.status)) {
    throw new AppError(`An event with ${event.status} can not be edited`, 409);
  }

  const requestedFields = Object.keys(updateData);

  if (requestedFields.length === 0) {
    throw new AppError("No fields provided for update", 400);
  }

  const invalidFields = requestedFields.filter(
    (field) => !EDITABLE_EVENT_FIELDS.includes(field),
  );

  if (invalidFields.length > 0) {
    throw new AppError(
      `The following fields can't be updated: ${invalidFields.join(", ")}`,
      400,
    );
  }

  const allowedUpdates = {};

  for (const field of EDITABLE_EVENT_FIELDS) {
    if (Object.hasOwn(updateData, field)) {
      allowedUpdates[field] = updateData[field];
    }
  }

  const now = new Date();

  const effectiveStart = new Date(
    allowedUpdates.startDateTime ?? event.startDateTime,
  );

  const effectiveEnd = new Date(
    allowedUpdates.endDateTime ?? event.endDateTime,
  );

  if (isNaN(effectiveStart) || isNaN(effectiveEnd)) {
    throw new AppError("Invalid date format", 400);
  }

  if (effectiveStart >= effectiveEnd) {
    throw new AppError(
      "the start date-time must be before the end date-time",
      400,
    );
  }

  if (effectiveStart < now) {
    throw new AppError("Start date-time cannot be in the past", 400);
  }

  if (allowedUpdates.venueId) {
    const venue = await venueRepository.findVenueById(allowedUpdates.venueId);

    if (!venue) {
      throw new AppError("Venue does not exist", 400);
    }
  }
  Object.assign(event, allowedUpdates);

  await event.save();

  return event;
};

module.exports = {
  createEvent,
  getPublishedEvents,
  getPublicEventById,
};
