
const getUserHandler = async (req, res) => {
  const { db } = req.app.locals;
  const { name } = req.params;
  const collectionName = process.env.MONGO_DB_COLLECTION_USERS;

  try {
    const result = await db.findOne(collectionName, { username: name });

    if (!result){
      res.send({ message: "User not found!"} );
    }

    res.send({ result });
  }
  catch(err){
    throw new Error(err);
  }
};

module.exports = getUserHandler;