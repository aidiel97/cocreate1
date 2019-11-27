const users = require('./users');
const books = require('./books');
const routers = [
  ...users,
  ...books
];

module.exports = (app) => {
  routers.forEach(router => app.use(router));
};