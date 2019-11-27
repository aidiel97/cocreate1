const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = 3000;

const router = require('../router');
const { errorHelper, notFoundHandler } = require('../utils');
const { DbConnector } = require('../connector');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

router(app);

app.use(notFoundHandler);
app.use(errorHelper);

// initiate mongodb
const dbOpts = {
    uri: process.env.MONGO_URI
}
const dbConnector = new DbConnector(dbOpts);
dbConnector.connect();

app.locals = {
    dbConnector
};

app.listen(port, () => console.log(`app listen on port ${port}`));