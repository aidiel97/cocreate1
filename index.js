const DbConnector = require('./DbConnector');

const opts = {
    uri: 'mongodb+srv://jenius:cocreate2019@cluster0-efoyc.mongodb.net/test'
}

const start = async () => {
    const dbConnector = new DbConnector(opts);
    await dbConnector.connect("test");
    const collectionName = 'users_1';

    const insert = await dbConnector.insertOne(collectionName, {
        name: 'Gusto',
        job: 'Programmer',
        age: '35',
        status: 'liatin'
    });
    const result = await dbConnector.find(collectionName, { job: 'Programmer' });
    console.log(result);
};

start();