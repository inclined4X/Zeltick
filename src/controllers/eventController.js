const eventService = require("../service/eventService");

const createEventController = async (req, res, next) => {
  try {
    const eventData = req.body;

    const userId = req.user._id;

    const event = await eventService.createEvent(eventData, userId);

    return res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

const getPublishedEventsController = async (req, res, next) => {
  try {
    const events = await eventService.getPublishedEvents();

    return res.status(200).json({
      status: "success",
      data: events,
    });
  } catch (err) {
    next(err);
  }
};

const getPublicEventByIdController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const event = await eventService.getPublicEventById(id);

    return res.status(200).json({
      status: "success",
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

const deleteEventController = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const deletedEvent = await eventService.deleteEvent(userId, eventId);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const updateEventController = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;
    const updateData = req.body;

    const updatedEvent = await eventService.updateEvent(
      userId,
      eventId,
      updateData,
    );

    return res.status(200).json({
      status: "success",
      data: updatedEvent,
    });
  } catch (err) {
    next(err);
  }
};

const publishEventController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.id;

    const publishedEvent = await eventService.publishEvent(eventId, userId);

    return res.status(200).json({
      status: "success",
      data: publishedEvent,
    });
  } catch (err) {
    next(err);
  }
};

const cancelEventController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.id;

    const cancelledEvent = await eventService.cancelEvent(eventId, userId);

    return res.status(200).json({
      status: "success",
      data: cancelledEvent,
    });
  } catch (err) {
    next(err);
  }
};

const completeEventController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.id;

    const completedEvent = await eventService.completeEvent(eventId, userId);

    return res.status(200).json({
      status: "success",
      data: completedEvent,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEventController,
  getPublishedEventsController,
  getPublicEventByIdController,
  deleteEventController,
  updateEventController,
  publishEventController,
  cancelEventController,
  completeEventController,
};
