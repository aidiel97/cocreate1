const express = require('express');
const app = express();
const port = 3089;

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
    // uri: 'mongodb+srv://jenius:cocreate2019@cluster0-efoyc.mongodb.net/test'
    uri: 'mongodb://localhost',
    name: 'jenius_cocreate'
}

const dbConnector = new DbConnector(dbOpts);

const connDb = async () => {
    let client;
    try {
        client = await dbConnector.connect();
        app.locals.db = client.db(dbOpts.name)

    } catch (e) {
        throw new Error('An error occured', e)
        process.exit(1);
    }  
}

connDb()


app.listen(port, () => console.log(`app listen on port ${port}`));