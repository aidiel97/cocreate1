const authMid = async(req, res, next) => {
    let errResult = {
        code: 403,
        message: 'Forbidden'
    };

    const auth = req.headers.authorization;

    if (!auth) {
        return next(new RequestError(errResult.message, errResult.message, errResult.code));
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
        req.app.locals.user = decoded
        return next()
    } catch (err) {
        console.error(err);
        return res.status(errResult.code).send(errResult)
    }
}