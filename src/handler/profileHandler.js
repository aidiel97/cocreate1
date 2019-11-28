const crypto = require('crypto');

const profileHandler = async (req, res) => {
    return res.json(req.app.locals.userInfo)
}

module.exports = profileHandler;
