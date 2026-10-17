const TicketType = require("../models/ticketTypeModel");

async function reserveTicketTypeInventory(ticketTypeId, quantity, session) {
  return TicketType.findOneAndUpdate(
    {
      _id: ticketTypeId,
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

module.exports = {
  reserveTicketTypeInventory,
};
