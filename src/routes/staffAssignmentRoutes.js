const staffAssignmentController = require("../controllers/staffAsssignmentController");
const authenticate = require("../middleware/authenticate");

router.post(
  "/staff-assignments",
  authenticate,
  staffAssignmentController.createStaffAssignmentController,
);
