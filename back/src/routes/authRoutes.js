const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { register, login, logout, getUser } = require("../controller/authController");


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getUser);

module.exports = router;
