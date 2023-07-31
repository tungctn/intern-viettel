const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const MessageController = require("../controllers/message.controller");

// @route GET api/messages
// getMessages
router.get("/:room", MessageController.getMessages);

// @route POST api/messages
// createMessage
router.post("/:room", verifyToken, MessageController.createMessage);

module.exports = router;
