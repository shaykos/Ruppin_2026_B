import { MongoClient } from "mongodb";

class DBServices {
    constructor() {
        this.client = new MongoClient(process.env.MONGO_URI);
        this.db = null;
    }

    async connect() {
        if (this.db) return this.db;

        await this.client.connect();
        this.db = this.client.db(process.env.DB_NAME);

        return this.db;
    }

    async close() {
        await this.client.close();
        this.db = null;
    }

    async getDocuments(collectionName, filter = {}, projection = {}) {
        const db = await this.connect();
        return await db.collection(collectionName).find(filter, { projection }).toArray();
    }

    async insertDocument(collectionName, document) {
        const db = await this.connect();
        return await db.collection(collectionName).insertOne(document);
    }

    async deleteDocument(collection, filter) {
        const db = await this.connect();
        return db.collection(collection).deleteOne(filter);
    }

    async updateDocument(collection, filter, updated) {
        const db = await this.connect();
        return db.collection(collection).updateOne(filter, updated);
    }
}

const dbService = new DBServices();

export default dbService;