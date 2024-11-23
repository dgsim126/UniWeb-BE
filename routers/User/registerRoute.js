const express = require('express');
const router = express.Router();
const { register } = require('../../controllers/User/registerController');

// POST /api/register
router.post('/', register);

module.exports = router;