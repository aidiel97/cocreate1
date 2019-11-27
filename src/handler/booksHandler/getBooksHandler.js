const getBooksHandler = (req, res) => {
  const books = [
    {
      title: 'Harry Potter',
      price: 2000
    },
    {
      title: 'Lorem Ipsum for Dummy',
      price: 3000
    }
  ];
  //LOGIC HERE
  res.send({ books });
};

module.exports = getBooksHandler;
