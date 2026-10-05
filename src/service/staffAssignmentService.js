const AppError = require("../errors/appError");
const { default: mongoose } = require("mongoose");

const userRepository = require("../repositories/userRepository");
const organizerRepository = require("../repositories/organizerRepository");
const eventRepository = require("../repositories/eventRepository");
const staffAssignmentRepository = require("../repositories/staffAssignmentRepository");

const ROLE_GRANT_PERMISSIONS = {
  organizer: ["manager", "ticket_seller", "check_in_staff"],
  manager: ["ticket_seller", "check_in_staff"],
};

const createStaffAssignmentService = async (
  requesterId,
  targetId,
  role,
  eventId = null,
) => {
  if (!mongoose.isValidObjectId(requesterId)) {
    throw new AppError("Requester ID is invalid", 400);
  }

  if (!mongoose.isValidObjectId(targetId)) {
    throw new AppError("Target user ID is invalid", 400);
  }

  let organizer;

  if (eventId !== null) {
    if (!mongoose.isValidObjectId(eventId)) {
      throw new AppError("Event ID is invalid", 400);
    }

    const event = await eventRepository.findEventById(eventId);

    if (!event) {
      throw new AppError("Event does not exist", 404);
    }

    organizer = await organizerRepository.findOrganizerById(event.organizerId);

    if (!organizer) {
      throw new AppError("Organizer does not exist", 404);
    }
  } else {
    organizer = await organizerRepository.findOrganizerByUserId(requesterId);

    if (!organizer) {
      throw new AppError("Organizer does not exist", 404);
    }
  }

  const isOwner = organizer.userId.equals(requesterId);

  let requesterRole;

  if (isOwner) {
    requesterRole = "organizer";
  } else {
    if (eventId === null) {
      throw new AppError(
        "Only the organizer owner can create organizer-wide assignments",
        403,
      );
    }

    const manager = await staffAssignmentRepository.findActiveManagerAssignment(
      requesterId,
      organizer._id,
    );

    if (!manager) {
      throw new AppError("You do not have permission to assign staff", 403);
    }

    requesterRole = "manager";
  }

  const allowedRoles = ROLE_GRANT_PERMISSIONS[requesterRole];

  if (!allowedRoles.includes(role)) {
    throw new AppError("You do not have permission to assign this role", 403);
  }

  const targetUser = await userRepository.findUserById(targetId);

  if (!targetUser) {
    throw new AppError("User does not exist", 404);
  }

  if (targetUser.status !== "active") {
    throw new AppError("User is not active", 400);
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

  return await staffAssignmentRepository.createStaffAssignment(staffData);
};

const listStaffOrganizerService = async (organizerId, requesterId) => {
  const organizer = await organizerRepository.findOrganizerById(organizerId);

  if (!organizer) {
    throw new AppError("Organizer does not exist", 404);
  }

  const isOwner = organizer.userId.equals(requesterId);

  if (isOwner) {
    return await staffAssignmentRepository.findAllForOrganizer(organizerId);
  } else {
    const manager = await staffAssignmentRepository.findActiveManagerAssignment(
      requesterId,
      organizer._id,
    );

    if (!manager) {
      throw new AppError("Manager does not exist", 403);
    }
    return await staffAssignmentRepository.findAllForOrganizer(requesterId);
  }
};

module.exports = {
  createStaffAssignmentService,
};
