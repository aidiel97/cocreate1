const mongodb = require('mongodb');
const uri = 'mongodb+srv://jenius:cocreate2019@cluster0-efoyc.mongodb.net/test';
const client = mongodb.MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).then((res) => {
    console.log('Connected!');
});
