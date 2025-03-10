const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { register, login, logout, getUser, updateProfile, changePassword, refreshToken } = require("../controller/authController");


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getUser);
router.put("/update-profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.post('/refresh-token', refreshToken);

module.exports = router;
