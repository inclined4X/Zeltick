const AppError = require("../errors/appError");
const userRepository = require("../repositories/userRepository");
const organizerRepository = require("../repositories/organizerRepository");
const eventRepository = require("../repositories/eventRepository");
const { default: mongoose } = require("mongoose");
const staffAssignmentRepository = require("../repositories/staffAssignmentRepository");

const createStaffAssignmentService = async (
  organizerId,
  userId,
  role,
  eventId,
  staffData,
) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw new AppError("ID is invalid", 400);
  }
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  if (user.status !== active) {
    throw new AppError("User is not active");
  }

  if (!mongoose.isValidObjectId(organizerId)) {
    throw new AppError("ID is invalid", 400);
  }

  const organizer =
    await organizerRepository.findOrganizerByUserId(organizerId);

  if (!organizer) {
    throw new AppError("Organizer does not exist", 404);
  }

  if (!mongoose.isValidObjectId(eventId)) {
    throw new AppError("ID is invalid", 400);
  }

  const event = await eventRepository.findEventById(eventId);

  if (!event) {
    throw new AppError("Event does not exist", 400);
  }

  if (!organizer._id.equals(event.organizerId)) {
    throw new AppError("You do not have permission to assign a staff");
  }

  const staffAssignmentAuthourity =
    await staffAssignmentRepository.findAssignmentAuthorization(
      userId,
      eventId,
      organizerId,
    );

  if (!staffAssignment) {
    throw new AppError("You can not assign staff", 400);
  }

  const staffAssignment =
    await staffAssignmentRepository.createStaffAssignment(staffData);

  await staffAssignment.save();

  return staffAssignment;
};
