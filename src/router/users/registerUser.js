const express = require('express');
const router = express.Router();

router.post('/register-user', (req, res) => {
  //LOGIC HERE
  res.send(req.body);
});

module.exports = router;