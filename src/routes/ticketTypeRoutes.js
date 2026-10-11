const express = require("express");
const ticketTypeController = require("../controllers/ticketTypeController");
const authenticate = require("../middleware/authenticate");
const router = express.router();

router.post("/", authenticate);
