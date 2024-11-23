const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../../controllers/User/profileController');
const { verifyToken } = require('../../middleware/token');

// GET /api/my
router.get('/', verifyToken, getProfile);

// PUT /api/my/update
router.put('/update', verifyToken, updateProfile);

module.exports = router;