const { createEvent } = require("../service/eventService");

const eventController = async (req, res, next) => {
  try {
    const eventData = req.body;

    const event = await createEvent(eventData);

    return res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

module.exports = eventController;
