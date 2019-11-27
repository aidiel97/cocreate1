const express = require('express');
const router = express.Router();

const { getBooksHandler: handler } = require('../../handler');
const { handlerMiddleware } = require('../../middleware');

router.get(
  '/books',
  handlerMiddleware(handler)
);

module.exports = router;
