import { MongoClient } from "mongodb";

export default class DBService {
    client = new MongoClient(process.env.MONGODB_URI);
    dbName = process.env.DB_NAME || "stam";

    static async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    static async disconnect() {
        try {
            await this.client.close();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
            throw error;
        }
    }

    static getDocuments(collection, filter = {}, projection = {}) {
        return this.client.db(this.dbName).collection(collection).find(filter, { projection }).toArray();
    }

    static insertDocument(collection, document) {
        return this.client.db(this.dbName).collection(collection).insertOne(document);
    }

    static updateDocument(collection, filter, updated) {
        return this.client.db(this.dbName).collection(collection).updateOne(filter, updated);
    }

    static deleteDocument(collection, filter) {
        return this.client.db(this.dbName).collection(collection).deleteOne(filter);
    }
}