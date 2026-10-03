const AppError = require("../errors/appError");
const {
  findOrganizerByUserId,
} = require("../repositories/organizerRepository");
const { findUserById } = require("../repositories/userRepository");

const organizerRepository = require("../repositories/organizerRepository");

const createStaffAssignmentService = async (
  organizerId,
  userId,
  role,
  eventId,
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  if (user.status !== active) {
    throw new AppError("User is not active");
  }

  const organizer =
    await organizerRepository.findOrganizerByUserId(organizerId);
};
