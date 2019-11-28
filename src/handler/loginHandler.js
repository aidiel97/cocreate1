const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const collectionName = 'users';

const loginHandler = async (req, res) => {
  const { db } = req.app.locals;

  const payload = {
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex')
  };

  const findUser = await db.findOne(collectionName, payload);

  if (!findUser) {
    const errResult = {
      code: 401,
      message: 'Unauthorized'
    };

    return res.status(401).json(errResult)
  }

  const payloadJwt = { 
    username: findUser.username,
    name: findUser.name,
  }

  const token = jwt.sign(payloadJwt, process.env.JWT_KEY);

  const result = {
    type: 'Bearer',
    accessToken: token
  }

  return res.status(200).json(result)
}

module.exports = loginHandler;