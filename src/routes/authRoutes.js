const express = require("express");
const validateAuth = require("../middleware/authValidation");
const validate = require("../middleware/validate");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", validateAuth, validate, authController);

module.exports = router;
