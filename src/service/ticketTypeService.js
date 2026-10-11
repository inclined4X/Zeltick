const eventService = require("../service/eventService");
const ticketTypeRepository = require("../repositories/ticketTypeRepository");
const AppError = require("../errors/appError");

const allowedStatus = ["DRAFT", "PUBLISHED"];

const createTicketType = async (userId, eventId, ticketTypeData) => {
  const event = await eventService.getOwnedEvent(eventId, userId);

  if (!allowedStatus.includes(event.status)) {
    throw new AppError("Ticket types cannot be created for this event", 400);
  }

  const ticketTypeName =
    await ticketTypeRepository.findTicketTypeByNameAndEvent(
      eventId,
      ticketTypeData.name,
    );

  if (ticketTypeName) {
    throw new AppError("This ticket type already exist", 409);
  }

  const ticketTypeDetails = {
    eventId: event._id,
    name: ticketTypeData.name,
    price: ticketTypeData.price,
    quantityTotal: ticketTypeData.quantityTotal,
  };

  return await ticketTypeRepository.createTicketType(ticketTypeDetails);
};
