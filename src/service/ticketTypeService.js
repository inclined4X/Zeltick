const eventService = require("../service/eventService");
const ticketTypeRepository = require("../repositories/ticketTypeRepository");
const AppError = require("../errors/appError");
const eventRepository = require("../repositories/eventRepository");
const { default: mongoose } = require("mongoose");

const allowedStatus = ["DRAFT", "PUBLISHED"];

const createTicketType = async (userId, eventId, ticketTypeData) => {
  const event = await eventService.getOwnedEvent(eventId, userId);

  if (!allowedStatus.includes(event.status)) {
    throw new AppError("Ticket types cannot be created for this event", 400);
  }

  const { name, price, quantityTotal } = ticketTypeData;

  if (typeof name !== "string" || !name.trim()) {
    throw new AppError("Ticket type name is required", 400);
  }

  const trimmedName = name.trim();

  const existingTicketType =
    await ticketTypeRepository.findTicketTypeByNameAndEvent(
      eventId,
      trimmedName,
    );

  if (existingTicketType) {
    throw new AppError("This ticket type already exist", 409);
  }

  const ticketTypeDetails = {
    eventId: event._id,
    name: trimmedName,
    price,
    quantityTotal,
  };

  return await ticketTypeRepository.createTicketType(ticketTypeDetails);
};

const listOrganizerEventTicketTypes = async (userId, eventId) => {
  await eventService.getOwnedEvent(eventId, userId);

  const eventTicketTypes =
    await ticketTypeRepository.findActiveEventTicketType(eventId);

  return eventTicketTypes;
};

const listPublicEventTicketTypes = async (eventId) => {
  if (!mongoose.isValidObjectId(eventId)) {
    throw new AppError("Event Id is invalid", 400);
  }

  const event = await eventRepository.findPublicEventById(eventId);

  if (!event) {
    throw new AppError("Event does not exist", 404);
  }

  if (event.status !== "PUBLISHED") {
    throw new AppError("Event is not publicly available", 404);
  }

  const publicActiveTicketTypes =
    await ticketTypeRepository.findActiveTicketTypes(eventId);

  return publicActiveTicketTypes;
};

const EDITABLE_TICKETTYPE_FIELDS = ["name", "price", "quantityTotal"];

const updateEventTicketType = async (
  userId,
  eventId,
  ticketTypeId,
  updateData,
) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw new AppError("User Id is invalid", 400);
  }

  if (!mongoose.isValidObjectId(eventId)) {
    throw new AppError("Event Id is invalid", 400);
  }

  if (!mongoose.isValidObjectId(ticketTypeId)) {
    throw new AppError("Ticket type Id is invalid", 400);
  }

  await eventService.getOwnedEvent(eventId, userId);

  const ticketType = await ticketTypeRepository.findTicketTypeByIdAndEvent(
    ticketTypeId,
    eventId,
  );

  if (!ticketType) {
    throw new AppError("Ticket type does not exist", 404);
  }

  if (
    !updateData ||
    typeof updateData !== "object" ||
    Array.isArray(updateData)
  ) {
    throw new AppError("Update data must be an object", 400);
  }

  const requestedFields = Object.keys(updateData);

  if (requestedFields.length === 0) {
    throw new AppError("No fields provided for this update", 400);
  }

  const invalidFields = requestedFields.filter(
    (field) => !EDITABLE_TICKETTYPE_FIELDS.includes(field),
  );

  if (invalidFields.length > 0) {
    throw new AppError(
      `The following fields can't be updated: ${invalidFields.join(", ")}`,
      400,
    );
  }

  const allowedUpdates = {};

  for (const field of EDITABLE_TICKETTYPE_FIELDS) {
    if (Object.hasOwn(updateData, field)) {
      allowedUpdates[field] = updateData[field];
    }
  }

  if (Object.hasOwn(allowedUpdates, "name")) {
    if (
      typeof allowedUpdates.name !== "string" ||
      allowedUpdates.name.trim().length < 2 ||
      allowedUpdates.name.trim().length > 100
    ) {
      throw new AppError(
        "Ticket type name must be between 2 and 100 characters",
        400,
      );
    }

    allowedUpdates.name = allowedUpdates.name.trim();

    const existingTicketType =
      await ticketTypeRepository.findTicketTypeByNameAndEvent(
        eventId,
        allowedUpdates.name,
      );

    if (
      existingTicketType &&
      existingTicketType._id.toString() !== ticketType._id.toString()
    ) {
      throw new AppError("This ticket type name already exists", 409);
    }
  }

  Object.assign(ticketType, allowedUpdates);

  if (
    ticketType.quantityTotal <
    ticketType.quantityHeld + ticketType.quantitySold
  ) {
    throw new AppError(
      "Total quantity cannot be less than tickets held plus tickets sold",
      400,
    );
  }

  await ticketType.save();

  return ticketType;
};

module.exports = {
  createTicketType,
  listOrganizerEventTicketTypes,
  listPublicEventTicketTypes,
  updateEventTicketType,
};
