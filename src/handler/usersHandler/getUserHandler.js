
const getUserHandler = (req, res) => {
  const { name } = req.params;
  res.send({name});
}

module.exports = getUserHandler;