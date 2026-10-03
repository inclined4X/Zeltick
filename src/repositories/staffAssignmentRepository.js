const StaffAssignment = require("../models/staffAssignmentModel");

const createStaffAssignment = async (staffData) => {
  return await StaffAssignment.create(staffData);
};

const findAssignmentAuthorization = async (userId, eventId, organizerId) => {
  return await StaffAssignment.findOne({
    userId,
    status: "active",
    $or: [
      { eventId, organizerId },
      { eventId: null, organizerId },
    ],
  });
};

const findActiveAssignment = async (userId, eventId, organizerId) => {
  return await StaffAssignment.findOne({
    userId,
    status: "active",
    eventId,
    organizerId,
  });
};

const findAllForOrganizer = async (organizerId) => {
  return await StaffAssignment.find({
    organizerId,
    status: "active",
  }).populate("userId", "firstName lastName email");
};

const findEffectiveStaffForEvent = async (eventId, organizerId) => {
  return await StaffAssignment.find({
    organizerId,
    status: "active",
    $or: [{ eventId }, { eventId: null }],
  }).populate("userId", "firstName lastName email");
};
