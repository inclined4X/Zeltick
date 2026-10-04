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

const findExactActiveAssignment = async (userId, eventId, organizerId) => {
  return await StaffAssignment.findOne({
    userId,
    status: "active",
    eventId,
    organizerId,
  });
};

const findActiveManagerAssignment = async (userId, organizerId) => {
  return await StaffAssignment.findOne({
    userId,
    organizerId,
    role: "manager",
    status: "active",
    eventId: null,
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

const findById = async (assignmentId) => {
  return await StaffAssignment.findById(assignmentId);
};

module.exports = {
  createStaffAssignment,
  findAssignmentAuthorization,
  findExactActiveAssignment,
  findAllForOrganizer,
  findEffectiveStaffForEvent,
  findById,
};
