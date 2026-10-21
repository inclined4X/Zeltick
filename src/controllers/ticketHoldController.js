const ticketHoldService = require("../services/ticketHoldService");

const createTicketHold = async (req, res) => {
  const userId = req.user._id;
  const { eventId, items } = req.body;

  const ticketHold = await ticketHoldService.createTicketHold(
    userId,
    eventId,
    items,
  );

  return res.status(201).json({
    status: "success",
    data: ticketHold,
  });
};

module.exports = {
  createTicketHold,
};
