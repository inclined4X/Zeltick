const TicketHold = require("../models/ticketHoldModel");
const TicketType = require("../models/ticketTypeModel");

async function reserveTicketTypeInventory(
  ticketTypeId,
  eventId,
  quantity,
  session,
) {
  return TicketType.findOneAndUpdate(
    {
      _id: ticketTypeId,
      eventId,
      status: "active",
      $expr: {
        $gte: [
          {
            $subtract: [
              "$quantityTotal",
              { $add: ["$quantityHeld", "$quantitySold"] },
            ],
          },
          quantity,
        ],
      },
    },
    {
      $inc: { quantityHeld: quantity },
    },
    {
      new: true,
      session,
    },
  );
}

const createTicketHold = async (holdData, session) => {
  const [ticketHold] = await TicketHold.create([holdData], { session });
  return ticketHold;
};

module.exports = {
  reserveTicketTypeInventory,
  createTicketHold,
};
