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

const listOrganizerEventTicketTypes = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;

    const ticketTypes = await ticketTypeService.listOrganizerEventTicketTypes(
      userId,
      eventId,
    );

    return res.status(200).json({
      status: "success",
      data: ticketTypes.map((ticketType) =>
        ticketTypeSerializer.toOrganizerTicketType(ticketType),
      ),
    });
  } catch (err) {
    next(err);
  }
};

const listPublicEventTicketTypes = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;

    const ticketTypes =
      await ticketTypeService.listPublicEventTicketTypes(eventId);

    return res.status(200).json({
      status: "success",
      data: ticketTypes.map((ticketType) =>
        ticketTypeSerializer.toPublicTicketType(ticketType),
      ),
    });
  } catch (err) {
    next(err);
  }
};

const updateEventTicketType = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;
    const ticketTypeId = req.params.ticketTypeId;
    const updateData = req.body;

    const updatedTicketType = await ticketTypeService.updateEventTicketType(
      userId,
      eventId,
      ticketTypeId,
      updateData,
    );

    return res.status(200).json({
      status: "success",
      data: ticketTypeSerializer.toOrganizerTicketType(updatedTicketType),
    });
  } catch (err) {
    next(err);
  }
};

const deactivateEventTicketType = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;
    const ticketTypeId = req.params.ticketType;

    const ticketType = await ticketTypeService.deactivateEventTicketType(
      userId,
      eventId,
      ticketTypeId,
    );

    return res.status(200).json({
      status: "success",
      data: ticketTypeSerializer.toOrganizerTicketType(ticketType),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTicketType,
  listOrganizerEventTicketTypes,
  listPublicEventTicketTypes,
  updateEventTicketType,
  deactivateEventTicketType,
};
