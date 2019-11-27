const schemaMiddleware = schema => {
  return async (req, res, next) => {
    const { error } = schema(req.body);
    if (error) {
      return next(new Error(error.message));
    } else {
      return next();
    }
  };
};

module.exports = schemaMiddleware;
