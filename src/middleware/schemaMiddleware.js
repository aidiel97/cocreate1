const { RequestError } = require('../utils');
const schemaMiddleware = (schema) => {
  return async (req, res, next) => {
    const { error } = schema(req.body);
    if (error) {
      return next(new RequestError(error.message, 'NOT_ACCEPTABLE', 400));
    } else {
      return next();
    }
  };
};

module.exports = schemaMiddleware;
