const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const profileHandler = require('../handler/profileHandler');

router.get(
  '/profile',
  authMiddleware,
  profileHandler,
);

module.exports = router;