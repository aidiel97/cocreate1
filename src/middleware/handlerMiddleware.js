const handlerMiddleware = (handler) => {
  return async (req, res, next) => {
    await handler(req, res);
    return next();
  };
};

module.exports = handlerMiddleware;
