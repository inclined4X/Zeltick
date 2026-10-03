const AppError = require("../errors/appError");
const userRepository = require("../repositories/userRepository");
const organizerRepository = require("../repositories/organizerRepository");
const eventRepository = require("../repositories/eventRepository");
const { default: mongoose } = require("mongoose");
const staffAssignmentRepository = require("../repositories/staffAssignmentRepository");

const createStaffAssignmentService = async (
  requesterId,
  targetId,
  role,
  eventId = null,
  staffData,
) => {
  if (!mongoose.isValidObjectId(targetId)) {
    throw new AppError("ID is invalid", 400);
  }

  if (!mongoose.isValidObjectId(requesterId)) {
    throw new AppError("ID is invalid", 400);
  }
  const user = await userRepository.findUserById(targetId);

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  if (user.status !== "active") {
    throw new AppError("User is not active");
  }

  const organizer =
    await organizerRepository.findOrganizerByUserId(requesterId);

  if (!organizer) {
    throw new AppError("Organizer does not exist", 404);
  }

  const event = await eventRepository.findEventById(eventId);

  if (!organizer._id.equals(event.organizerId)) {
    throw new AppError("You do not have permission to assign a staff");
  }

  const staffAssignmentAuthourity =
    await staffAssignmentRepository.findExactActiveAssignment(
      userId,
      eventId,
      organizerId,
    );

  if (!staffAssignment) {
    throw new AppError("You can not assign staff", 400);
  }

  const staffAssignment =
    await staffAssignmentRepository.createStaffAssignment(staffData);

  return staffAssignment;
};
