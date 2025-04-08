const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  validateUser,
  banUser,
  deleteUser,
  getUsers,
  getAllUsersPendingStatus,
  createAdmin,
} = require("../controller/adminController");

const router = express.Router();

router.put("/validate", authMiddleware, roleMiddleware, validateUser);
router.put("/ban", authMiddleware, roleMiddleware, banUser);
router.delete("/delete/:id", authMiddleware, roleMiddleware, deleteUser);
router.get("/users", authMiddleware, roleMiddleware, getUsers);
router.get(
  "/users/pending",
  authMiddleware,
  roleMiddleware,
  getAllUsersPendingStatus
);
router.post("/create-admin", createAdmin);

module.exports = router;
