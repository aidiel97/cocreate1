const jwt = require('jsonwebtoken');

const authMid = async(req, res, next) => {
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
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_KEY);

        // assign this variable to next request
        req.app.locals.userInfo = decoded
        return next()
    } catch (err) {
        console.error(err);
        return res.status(errResult.code).send(errResult)
    }
}

module.exports = authMid;
