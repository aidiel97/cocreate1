const express = require('express');
const router = express.Router();
const { userSchema } = require('../../schema');
const { schemaMiddleware } = require('../../middleware');
const { registerUserHandler } = require('../../handler/usersHandler');

router.post(
  '/register',
  registerUserHandler,
);

module.exports = router;