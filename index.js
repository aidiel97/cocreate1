const DbConnector = require('./DbConnector');

const opts = {
    uri: 'mongodb+srv://jenius:cocreate2019@cluster0-efoyc.mongodb.net/test'
}

const start = async () => {
    const dbConnector = new DbConnector(opts);
    const client = await dbConnector.connect();
    const db = client.db("test");

    const collection = await dbConnector.getCollection(db, 'users_1');
    const insert = await dbConnector.insertOne(collection, {
        name: 'Eric',
        job: 'Programmer',
        age: '27',
        status: 'coding'
    });
    const result = await dbConnector.findOne(collection, { name: 'Eric' });
    console.log(result);
};

start();