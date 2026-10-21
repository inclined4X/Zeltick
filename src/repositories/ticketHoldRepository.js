const TicketHold = require("../models/ticketHoldModel");
const TicketType = require("../models/ticketTypeModel");

const findActiveHoldByUserAndEvent = async (userId, eventId, session) => {
  return await TicketHold.findOne({
    userId,
    eventId,
    status: "active",
  }).session(session);
};

const updateHoldStatus = async (holdId, expectedStatus, newStatus, session) => {
  return await TicketHold.updateOne(
    {
      _id: holdId,
      status: expectedStatus,
    },
    {
      $set: { status: newStatus },
    },
    { session },
  );
};

const reserveTicketTypeInventory = async (
  ticketTypeId,
  eventId,
  quantity,
  session,
) => {
  return await TicketType.findOneAndUpdate(
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
};

const releaseTicketTypeInventory = async (
  ticketTypeId,
  eventId,
  quantity,
  session,
) => {
  return await TicketType.updateOne(
    {
      _id: ticketTypeId,
      eventId,
      quantityHeld: { $gte: quantity },
    },
    {
      $inc: { quantityHeld: -quantity },
    },
    { session },
  );
};

const createTicketHold = async (holdData, session) => {
  const [ticketHold] = await TicketHold.create([holdData], { session });
  return ticketHold;
};

module.exports = {
  findActiveHoldByUserAndEvent,
  reserveTicketTypeInventory,
  createTicketHold,
};
