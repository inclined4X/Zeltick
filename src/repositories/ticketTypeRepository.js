const TicketType = require("../models/ticketTypeModel");

const createTicketType = async (ticketTypeData) => {
  return await TicketType.create(ticketTypeData);
};

const findTicketTypeById = async (ticketTypeId) => {
  return await TicketType.findById(ticketTypeId);
};

const findEventTicketType = async (eventId) => {
  return await TicketType.find({
    eventId: eventId,
    status: active,
  });
};

const findEventTicketTypes = async (eventId) => {
  return await TicketType.find({
    eventId: eventId,
    status: active,
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
