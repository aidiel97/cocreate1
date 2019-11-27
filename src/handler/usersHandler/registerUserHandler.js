const crypto = require('crypto');
const collectionName = 'users';

const registerUserHandler = async (req, res) => {
  const { db } = req.app.locals;

  const coll = db.collection(collectionName)

  const payload = {
    username: req.body.username.trim(),
    name: req.body.name.trim(),
    password: crypto.createHash('sha256').update(req.body.password).digest('hex')
  };

  const insResult = await coll.insertOne(payload);
  
  if (!insResult) {
    const errResult = {
      code: 500,
      message: 'An error occured'
    };

    return res.status(500).send(errResult);
  }

  const result = {
    id: insResult.insertedId,
    username: payload.username,
    name: payload.name,
    status: 'SUCCESS'
  };

  return res.send(result)
};

module.exports = registerUserHandler;