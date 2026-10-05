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

const listStaffOrganizerController = async (req, res, next) => {
  try {
    const organizerId = req.params.id;
    const requesterId = req.user._id;

    const staff = await staffAssignmentService.listStaffOrganizerService(
      organizerId,
      requesterId,
    );

    return res.status(200).json({
      status: "success",
      data: staff,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStaffAssignmentController,
};
