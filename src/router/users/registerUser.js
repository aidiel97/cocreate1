const express = require('express');
const router = express.Router();
const { userSchema } = require('../../schema');
const { schemaMiddleware } = require('../../middleware');

router.post('/register-user', schemaMiddleware(userSchema), (req, res) => {
  //YOUR CODE HERE

  //END OF CODE
  res.send(req.body);
});

module.exports = router;