const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const isRoomOwner = require("../middlewares/isRoomOwner");
const { createRoom, getRooms, getRoomById, joinRoom, leaveRoom, deleteRoom  } = require("../controller/roomController");

const router = express.Router();

router.post("/", authMiddleware, createRoom);
router.get("/", authMiddleware, getRooms);
router.get("/:id", authMiddleware, getRoomById);
router.post("/:id/join", authMiddleware, joinRoom);
router.post("/:id/leave", authMiddleware, leaveRoom);
router.delete("/:id", authMiddleware, isRoomOwner, deleteRoom);

module.exports = router;
