
const getUserHandler = async (req, res) => {
  const { dbConnector } = req.app.locals;
  const { name } = req.params;
  const dbName = process.env.MONGO_DB_NAME;
  const dbCollection = process.env.MONGO_DB_COLLECTION_USERS;

  try {
    const client = await dbConnector.getClient();
    const db = client.db(dbName);
    const collection = await dbConnector.getCollection(db, dbCollection);
    const result = await dbConnector.findOne(collection, { name: name });

    if (!result){
      res.send({ message: "User not found!"} );
    }

    res.send({ result });
  }
  catch(err){
    throw new Error(err);
  }
}

module.exports = getUserHandler;