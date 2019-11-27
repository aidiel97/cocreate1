const users = require('./users');
const books = require('./books');
const login = require('./login');
const profile = require('./profile');

const routers = [
  ...users,
  ...books,
  login,
  profile
];

module.exports = (app) => {
  routers.forEach(router => app.use(router));
};