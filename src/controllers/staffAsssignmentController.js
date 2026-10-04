const staffAssignmentService = require("../service/staffAssignmentService");

const createStaffAssignmentController = async (req, res, next) => {
  try {
    const requesterId = req.user._id;
    const { targetId, role, eventId } = req.body;

    const assignment =
      await staffAssignmentService.createStaffAssignmentService(
        requesterId,
        targetId,
        role,
        eventId ?? null,
      );

    return res.status(201).json({
      status: "success",
      data: assignment,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStaffAssignmentController,
};
