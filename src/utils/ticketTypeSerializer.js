const toPublicTicketType = (ticketType) => {
  return {
    id: ticketType._id,
    eventId: ticketType.eventId,
    name: ticketType.name,
    price: ticketType.price,
    quantityTotal: ticketType.quantityTotal,
    quantityAvailable: ticketType.quantityAvailable,
    status: ticketType.status,
    createdAt: ticketType.createdAt,
    updatedAt: ticketType.updatedAt,
  };
};

const toOrganizerTicketType = (ticketType) => {
  return {
    id: ticketType._id,
    eventId: ticketType.eventId,
    name: ticketType.name,
    price: ticketType.price,
    quantityTotal: ticketType.quantityTotal,
    quantityHeld: ticketType.quantityHeld,
    quantitySold: ticketType.quantitySold,
    quantityAvailable: ticketType.quantityAvailable,
    status: ticketType.status,
    createdAt: ticketType.createdAt,
    updatedAt: ticketType.updatedAt,
  };
};
module.exports = { toPublicTicketType, toOrganizerTicketType };
