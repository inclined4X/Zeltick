const AppError = require("../errors/appError");
const userRepository = require("../repositories/userRepository");

const organizerRepository = require("../repositories/organizerRepository");

const eventRepository = require("../repositories/eventRepository");

const createStaffAssignmentService = async (
  organizerId,
  userId,
  role,
  eventId,
) => {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  if (user.status !== active) {
    throw new AppError("User is not active");
  }

  const organizer =
    await organizerRepository.findOrganizerByUserId(organizerId);

  if (!organizer) {
    throw new AppError("Organizer does not exist", 404);
  }

  const event = await eventRepository.findEventById(eventId);

  if (!event) {
    throw new AppError("Event does not exist", 400);
  }
};
