const express = require('express');
const router = express.Router();
const { userSchema } = require('../../schema');
const { schemaMiddleware } = require('../../middleware');
const { registerUserHandler: handler } = require('../../handler');
const { handlerMiddleware } = require('../../middleware');

router.post(
  '/register-user',
  schemaMiddleware(userSchema),
  handlerMiddleware(handler)
);

module.exports = router;