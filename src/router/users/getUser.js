const express = require('express');
const router = express.Router();

router.get('/users/:name', (req, res) => {
  const { name } = req.params;
  //LOGIC HERE
  res.send({ name });
});

module.exports = router;
