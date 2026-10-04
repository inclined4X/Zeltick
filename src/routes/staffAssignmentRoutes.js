const express = require("express");
const router = express.Router();
const staffAssignmentController = require("../controllers/staffAsssignmentController");
const authenticate = require("../middleware/authenticate");

router.post(
  "/staff-assignments",
  authenticate,
  staffAssignmentController.createStaffAssignmentController,
);

module.exports = router;
