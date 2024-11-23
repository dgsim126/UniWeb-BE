const express = require('express');
const router = express.Router();
const { login, logout } = require('../../controllers/User/loginController');

// POST /api/login
router.post('/login', login);

// POST /api/logout
router.post('/logout', logout);

module.exports = router;