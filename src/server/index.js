const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = 3000;

const router = require('../router');
const { 
  errorHelper, 
  notFoundHandler,
  requestLogger,
  logger
} = require('../utils');
const { DbConnector } = require('../connector');

const connectDb = async (app) => {
    // initiate mongodb
    const dbOpts = {
        uri: process.env.MONGO_URI
    }
    const dbName = process.env.MONGO_DB_NAME;

    const dbConnector = new DbConnector(dbOpts);
    await dbConnector.connect(dbName);

    app.locals.db = dbConnector;
};

connectDb(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(requestLogger);

router(app);

app.use(notFoundHandler);
app.use(errorHelper);

app.listen(port, () => logger.info(`app listen on port ${port}`));