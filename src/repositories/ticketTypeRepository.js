const TicketType = require("../models/ticketTypeModel");

const createTicketType = async (TicketTypeData) => {
  return await TicketType.create(ticketTypeData);
};
