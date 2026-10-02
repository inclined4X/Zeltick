const StaffAssignment = require("../models/staffAssignmentModel");

const createStaffAssignment = async (staffData) => {
  return await StaffAssignment.create(staffData);
};

const findAssignmentAuthourization = async (userId, eventId, organizerId) => {
  return await StaffAssignment.findOne({
    userId,
    status: "active",
    $or: [{ eventId }, { eventId: null, organizerId }],
  });
};
