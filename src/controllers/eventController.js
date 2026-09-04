const { createEvent } = require("../service/eventService");

const eventController = async (req, res, next) => {
  try {
    const eventData = req.body;

    const userId = req.user._id;

    const event = await createEvent(eventData, userId);

    return res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

module.exports = eventController;
