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
  const targetUser = await userRepository.findUserById(targetId);

  if (!targetUser) {
    throw new AppError("User does not exist", 404);
  }

  if (targetUser.status !== "active") {
    throw new AppError("User is not active");
  }

  const organizer =
    await organizerRepository.findOrganizerByUserId(requesterId);

  if (!organizer) {
    throw new AppError("Organizer does not exist", 404);
  }

  if (eventId !== null) {
    if (!mongoose.isValidObjectId(eventId)) {
      throw new AppError("Event ID is invalid", 400);
    }
  }

  const event = await eventRepository.findEventById(eventId);

  if (!event) {
    throw new AppError("Event does not exist", 404);
  }

  if (!organizer._id.equals(event.organizerId)) {
    throw new AppError("Event does not belong to this organizer", 403);
  }

  const existingAssignment =
    await staffAssignmentRepository.findExactActiveAssignment(
      targetId,
      eventId,
      organizer._id,
    );

  if (existingAssignment) {
    throw new AppError("User already has this active assignment", 409);
  }

  const staffData = {
    organizerId: organizer._id,
    userId: targetId,
    eventId,
    role,
    addedBy: requesterId,
    status: "active",
    revokedAt: null,
  };

  await staffAssignmentRepository.createStaffAssignment(staffData);

  return staffAssignment;
};
