const { default: mongoose } = require("mongoose");
const AppError = require("../errors/appError");
const eventRepository = require("../repositories/eventRepository");
const organizerRepository = require("../repositories/organizerRepository");
const venueRepository = require("../repositories/venueRepository");
const { decodeCursor, encodeCursor } = require("../utils/cursor");

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
      "The start date-time can't be greater than the end date time",
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

const getPublishedEvents = async ({ limit = 20, cursor }) => {
  if (limit < 1 || limit > 100) {
    throw new AppError("limit must be between 1 and 100", 400);
  }

  let decodedCursor;

  if (cursor) {
    try {
      decodedCursor = decodeCursor(cursor);
    } catch (err) {
      throw new AppError("Invalid cursor", 400);
    }
  }

  const events = await eventRepository.findPublishedEvents({
    limit,
    cursor: decodedCursor,
  });

  const hasNextPage = events.length > limit;

  if (hasNextPage) {
    events.pop();
  }

  const nextCursor = hasNextPage
    ? encodeCursor({
        startDateTime: events[events.length - 1].startDateTime,
        id: events[events.length - 1]._id,
      })
    : null;

  const publicEvents = events.map(toPublicEvent);

  return { events: publicEvents, nextCursor };
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
  if (!mongoose.isValidObjectId(eventId)) {
    throw new AppError("Event ID is invalid", 400);
  }

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
      "The start date-time must be before the end date-time",
      400,
    );
  }

  if (effectiveStart < now) {
    throw new AppError("Start date-time cannot be in the past", 400);
  }

  if (Object.hasOwn(allowedUpdates, "venueId")) {
    if (!mongoose.isValidObjectId(allowedUpdates.venueId)) {
      throw new AppError("Venue ID is invalid", 400);
    }
    const venue = await venueRepository.findVenueById(allowedUpdates.venueId);
    if (!venue) {
      throw new AppError("Venue does not exist", 404);
    }
  }

  Object.assign(event, allowedUpdates);

  await event.save();

  return toPublicEvent(event);
};

const getOwnedEvent = async (eventId, userId) => {
  if (!mongoose.isValidObjectId(eventId)) {
    throw new AppError("ID is invalid", 400);
  }

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

  return event;
};

const VALID_TRANSITIONS = {
  DRAFT: ["PUBLISHED", "CANCELLED"],
  PUBLISHED: ["CANCELLED", "COMPLETED"],
  CANCELLED: [],
  COMPLETED: [],
};

const transitionEventState = async (eventId, userId, targetStatus) => {
  const event = await getOwnedEvent(eventId, userId);

  const currentStatus = event.status;

  const allowedTargets = VALID_TRANSITIONS[currentStatus];

  if (!allowedTargets) {
    throw new AppError(`Invalid event status: ${currentStatus}`, 500);
  }

  if (!allowedTargets.includes(targetStatus)) {
    throw new AppError(
      `Cannot transition event from ${currentStatus} to ${targetStatus}`,
      409,
    );
  }

  if (targetStatus === "PUBLISHED") {
    const now = new Date();

    if (event.startDateTime <= now) {
      throw new AppError(
        "Event can't be published because start date-time is in the past",
        409,
      );
    }

    if (event.startDateTime >= event.endDateTime) {
      throw new AppError(
        "Event can't be published because the start date-time must be before end date-time",
        409,
      );
    }
  }

  event.status = targetStatus;

  if (targetStatus === "PUBLISHED") {
    event.wasEverPublished = true;
  }

  return await event.save();
};

const publishEvent = (eventId, userId) =>
  transitionEventState(eventId, userId, "PUBLISHED");

const cancelEvent = (eventId, userId) =>
  transitionEventState(eventId, userId, "CANCELLED");

const completeEvent = (eventId, userId) =>
  transitionEventState(eventId, userId, "COMPLETED");

const deleteEvent = async (eventId, userId) => {
  const event = await getOwnedEvent(eventId, userId);

  if (event.wasEverPublished) {
    throw new AppError(
      "Event that has already been published cannot be deleted",
      409,
    );
  }

  return await eventRepository.findEventByIdAndDelete(eventId);
};

module.exports = {
  createEvent,
  getPublishedEvents,
  getPublicEventById,
  deleteEvent,
  updateEvent,
  publishEvent,
  cancelEvent,
  completeEvent,
};
