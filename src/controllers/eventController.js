const eventService = require("../service/eventService");

const eventController = async (req, res, next) => {
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

module.exports = eventController;
