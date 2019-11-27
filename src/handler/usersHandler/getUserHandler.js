
const getUserHandler = (req, res) => {
  const { dbConnector } = req.app.locals;
  const { name } = req.params;

  const client = dbConnector.getClient(); 
  const db = client.db('test');
  const collection = await dbConnector.getCollection(db, 'users');
  const result = dbConnector.findOne(collection, { name: name });

  res.send({ result });
}

module.exports = getUserHandler;