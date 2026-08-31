const AppError = require("../errors/appError");
const eventRepository = require("../repositories/eventRepository");

const createEvent = async (eventData) => {
  const { startDateTime, endDateTime } = eventData;
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const now = new Date();

  if (isNaN(start) || isNaN(end)) {
    throw new AppError("Invalid date format", 400);
  }

  if (start >= end)
    throw new AppError(
      "The start date-time cant be greater than the end date time",
      400,
    );

  if (start < now) throw new AppError("Date cannot be in the past", 400);
  return await eventRepository(eventData);
};

module.exports = {
  createEvent,
};
