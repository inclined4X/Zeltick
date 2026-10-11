const ticketTypeService = require("../service/ticketTypeService");
const ticketTypeSerializer = require("../utils/ticketTypeSerializer");

const createTicketType = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;
    const ticketTypeData = req.body;

    const ticketType = await ticketTypeService.createTicketType(
      userId,
      eventId,
      ticketTypeData,
    );

    return res.status(201).json({
      status: "success",
      data: ticketTypeSerializer.toOrganizerTicketType(ticketType),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTicketType };
