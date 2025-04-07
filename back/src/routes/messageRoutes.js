const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { sendMessage, getMessages } = require("../controller/messageController");

const router = express.Router();

router.post("/:roomId/messages", authMiddleware, sendMessage);
router.get("/:roomId/messages", authMiddleware, getMessages);

module.exports = router;
