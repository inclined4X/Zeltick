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
