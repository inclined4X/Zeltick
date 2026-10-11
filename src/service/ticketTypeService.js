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

module.exports = {
  createTicketType,
  listOrganizerEventTicketTypes,
  listPublicEventTicketTypes,
};
