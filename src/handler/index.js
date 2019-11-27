const booksHandler = require('./booksHandler');
const usersHandler = require('./usersHandler');

module.exports = {
  ...booksHandler,
  ...usersHandler
};
