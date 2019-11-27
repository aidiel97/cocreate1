const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/:id', (req, res) => {
  res.send({
    param: req.params.id,
    query: req.query.name
  })
});

app.post('/', (req, res) => res.send(req.body));

app.listen(port, () => console.log(`app listen on port ${port}`));