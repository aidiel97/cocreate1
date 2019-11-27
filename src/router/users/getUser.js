const express = require('express');
const router = express.Router();

const { getUserHandler : handler } = require('../../handler');
const { handlerMiddleware } = require('../../middleware');

router.get(
  '/users/:name',
  handlerMiddleware(handler)
);

module.exports = router;
