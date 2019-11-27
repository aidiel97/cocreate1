const express = require('express');
const router = express.Router();
const profileHandler = require('../handler/profileHandler');

router.get(
  '/profile',
  profileHandler,
);

module.exports = router;