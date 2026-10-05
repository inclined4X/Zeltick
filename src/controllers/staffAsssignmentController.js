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
    const organizerId = req.params.organizerId;
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

const listStaffSpecificEventController = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const requesterId = req.user._id;

    const staff = await staffAssignmentService.listStaffSpecificEventService(
      requesterId,
      eventId,
    );

    return res.status(200).json({
      status: "success",
      data: staff,
    });
  } catch (err) {
    next(err);
  }
};

const revokeAssignmentController = async (req, res, next) => {
  try {
    const requesterId = req.user._id;
    const assignmentId = req.params.assignmentId;

    const assignment = await staffAssignmentService.revokeAssignmentService(
      requesterId,
      assignmentId,
    );

    return res.status(200).json({
      status: "success",
      data: assignment,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStaffAssignmentController,
  listStaffOrganizerController,
  listStaffSpecificEventController,
  revokeAssignmentController,
};
