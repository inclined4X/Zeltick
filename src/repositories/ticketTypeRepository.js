const TicketType = require("../models/ticketTypeModel");

const createTicketType = async (ticketTypeData) => {
  return await TicketType.create(ticketTypeData);
};

const findTicketTypeById = async (ticketTypeId) => {
  return await TicketType.findById(ticketTypeId);
};

const findActiveEventTicketType = async (eventId) => {
  return await TicketType.findOne({
    eventId: eventId,
    status: "active",
  });
};

const findEventTicketTypes = async (eventId) => {
  return await TicketType.find(eventId);
};

const findActiveTicketTypes = async (eventId) => {
  return await TicketType.find({
    eventId,
    status: "active",
  });
};

const findTicketTypeByNameAndEvent = async (eventId, name) => {
  return await TicketType.findOne({
    eventId: eventId,
    name: name,
  });
};

const reserveInventory = async (ticketTypeId, quantity) => {
  return await TicketType.findOneAndUpdate(
    {
      _id: ticketTypeId,
      status: "active",
      $expr: {
        $gte: [
          {
            $subtract: [
              "$quantityTotal",
              {
                $add: ["$quantityHeld", "$quantitySold"],
              },
            ],
          },
          quantity,
        ],
      },
    },
    {
      $inc: { quantityHeld: quantity },
    },
    { new: true },
  );
};

module.exports = {
  createTicketType,
  findTicketTypeById,
  findActiveEventTicketType,
  findEventTicketTypes,
  findActiveTicketTypes,
  findTicketTypeByNameAndEvent,
  reserveInventory,
};
