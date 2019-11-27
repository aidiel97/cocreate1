const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const collectionName = 'users';

const profileHandler = async (req, res) => {
    const keyJwt = 'shhhhh';

    let errResult = {
        code: 403,
        message: 'Forbidden'
    };


    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(errResult.code).send(errResult)
    }

    const authArrSplit = auth.split(' ')

    const typeAuth = authArrSplit[0]

    if (typeAuth != 'Bearer') {
        return res.status(errResult.code).send(errResult)
    }

    const accessToken = authArrSplit[1]
    let decoded;
    try {
        decoded = jwt.verify(accessToken, keyJwt);
    } catch (err) {
        console.error(err);
        return res.status(errResult.code).send(errResult)
    }


    return res.send(decoded)
}

module.exports = profileHandler;
