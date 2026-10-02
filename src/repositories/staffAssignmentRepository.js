const StaffAssignment = require("../models/staffAssignmentModel");

const createStaffAssignment = async (staffData) => {
  return await StaffAssignment.create(staffData);
};
