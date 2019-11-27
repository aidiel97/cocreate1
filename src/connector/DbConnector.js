const mongodb = require('mongodb');

class DbConnector {
    constructor(opts) {
        Object.assign(this, { opts });
    };

    async connect(){
        const { uri } = this.opts;
        const client = await mongodb.MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
        if (client) {
            console.log('Successfully connected to DB!');
        }
        Object.assign(this, { client });
        return client;
    }

    async disconnect() {
        this.client.close();
    }

    async getClient(){
        return this.client;
    }

    async createCollection(db, name){
        return new Promise((resolve) => {
            db.createCollection(name, { strict: true }).then((res) => {
                resolve(true);
            }).catch((res) => {
                resolve(false);
            });
        });
    }

    async getCollection(db, name){
        return db.collection(name);
    }

    async insertOne(collection, payload) {
        const result = await collection.insertOne(payload);
        return result.result.ok > 0;
    }

    async insert(collection, payload) {
        const result = await collection.insert(payload);
        return result.result.ok > 0;
    }

    async findOne(collection, filter) {
        return collection.findOne(filter);
    }

    async find(collection, filter){
        return collection.find(filter).toArray();
    }

    async findOneAndUpdate(collection, filter, payload) {
        const result = await collection.findOneAndUpdate(filter, { $set: payload });
        return result.value;
    }

    async updateOne(collection, filter, payload){
        const result = await collection.updateOne(filter, { $set: payload });
        return result.result.ok > 0;
    }

    async updateMany(collection, filter, payload) {
        const result = await collection.updateMany(filter, { $set: payload });
        return result.result.ok > 0;
    }

    async deleteOne(collection, filter){
        const check = await this.findOne(collection, filter);

        if (check) {
            const result = await collection.deleteOne(filter);
            return result.result.ok > 0;
        }

        throw new Error('Cannot delete unavailable data!');
    }

};

module.exports = DbConnector;