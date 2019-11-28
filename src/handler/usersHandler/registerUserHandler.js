const registerUserHandler = async (req, res) => {
  //LOGIC HERE
  const { db } = req.app.locals;
  const payload = req.body;
  const collectionName = process.env.MONGO_DB_COLLECTION_USERS;

  try {
    const result = await db.insertOne(collectionName, payload);
    if (result) {
      res.send(result);
    }

    throw new Error("Failed to insert!");
  }
  catch(err){
    throw err;
  }
};

module.exports = registerUserHandler;