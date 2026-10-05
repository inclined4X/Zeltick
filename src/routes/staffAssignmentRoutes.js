const express = require("express");
const router = express.Router();
const staffAssignmentController = require("../controllers/staffAsssignmentController");
const authenticate = require("../middleware/authenticate");

router.post(
  "/staff-assignments",
  authenticate,
  staffAssignmentController.createStaffAssignmentController,
);

router.get(
  "/organizers/:organizerId/staff",
  authenticate,
  staffAssignmentController.listStaffOrganizerController,
);

router.get(
  "/events/:eventId/staff",
  authenticate,
  staffAssignmentController.listStaffSpecificEventController,
);

module.exports = router;
