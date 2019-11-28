const mongodb = require('mongodb');
const {
    NotFoundError
} = require('../utils');

class DbConnector {
    constructor(opts) {
        Object.assign(this, { opts });
    };

    async connect(dbName){
        const { uri, logger } = this.opts;
        const client = await mongodb.MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
        if (client) {
            logger.info('Successfully connected to DB!');
        }

        const result = {
            db: client.db(dbName),
            client
        };

        Object.assign(this, result);
        return result;
    }

    async disconnect() {
        this.client.close();
    }

    async getClient(){
        return this.client;
    }

    async createCollection(name){
        const db = this.db;
        return new Promise((resolve) => {
            db.createCollection(name, { strict: true }).then((res) => {
                resolve(true);
            }).catch((res) => {
                resolve(false);
            });
        });
    }

    async getCollection(collectionName){
        return this.db.collection(collectionName);
    }

    async insertOne(collectionName, payload) {
        const collection = await this.getCollection(collectionName);
        const result = await collection.insertOne(payload);
        return result;
    }

    async insert(collectionName, payload) {
        const collection = await this.getCollection(collectionName);
        const result = await collection.insert(payload);
        return result.result.ok > 0;
    }

    async findOne(collectionName, filter) {
        const collection = await this.getCollection(collectionName);
        return collection.findOne(filter);
    }

    async find(collectionName, filter){
        const collection = await this.getCollection(collectionName);
        return collection.find(filter).toArray();
    }

    async findOneAndUpdate(collectionName, filter, payload) {
        const collection = await this.getCollection(collectionName);
        const result = await collection.findOneAndUpdate(filter, { $set: payload });
        return result.value;
    }

    async updateOne(collectionName, filter, payload){
        const collection = await this.getCollection(collectionName);
        const result = await collection.updateOne(filter, { $set: payload });
        return result.result.ok > 0;
    }

    async updateMany(collectionName, filter, payload) {
        const collection = await this.getCollection(collectionName);
        const result = await collection.updateMany(filter, { $set: payload });
        return result.result.ok > 0;
    }

    async deleteOne(collectionName, filter){
        const collection = await this.getCollection(collectionName);
        const check = await this.findOne(collectionName, filter);

        if (check) {
            const result = await collection.deleteOne(filter);
            return result.result.ok > 0;
        }

        throw new NotFoundError();
    }

}

module.exports = DbConnector;