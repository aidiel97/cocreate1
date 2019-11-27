const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const collectionName = 'users';

const loginHandler = async (req, res) => {
  const { db } = req.app.locals;

  const coll = db.collection(collectionName)

  const payload = {
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex')
  };

  console.log('payload', payload)

  const findUser = await coll.findOne(payload);

  if (!findUser) {
    const errResult = {
      code: 401,
      message: 'Unauthorized'
    };

    return res.status(401).send(errResult)
  }

  const keyJwt = 'shhhhh';

  const payloadJwt = { 
    username: findUser.username,
    name: findUser.name,
  }

  const token = jwt.sign(payloadJwt, keyJwt);

  const result = {
    type: 'Bearer',
    accessToken: token
  }

  return res.send(result)
}

module.exports = loginHandler;