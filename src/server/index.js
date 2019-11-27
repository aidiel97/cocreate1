const express = require('express');
const app = express();
const port = 3000;

const router = require('../router');
const { errorHelper, notFoundHandler } = require('../utils');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

router(app);

app.use(notFoundHandler);
app.use(errorHelper);

app.listen(port, () => console.log(`app listen on port ${port}`));