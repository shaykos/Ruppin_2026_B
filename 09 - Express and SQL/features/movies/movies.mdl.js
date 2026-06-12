//import { ObjectId } from "mongodb";
//import mongodbService from "../../utils/db.mongo.service.js";
import sqlServices from "../../utils/db.sql.services.js";

export default class MoviesMdl {

    static async getAllMoviesFromDB() {
        let query = "select * from movies";
        let data = await sqlServices.executeQuery(query);
        return data;
    }

    static async getMovieByIdFromDB(id) {
        // let filter = { _id: ObjectId.createFromHexString(id) }
        // //let filter = { name: name }

        // let result = await mongodbService.getDocuments("movies", filter);
        // return result[0] ?? null;

        return 2;
    }

    static async addMovieToDB(movie) {
        // let result = await mongodbService.insertDocument("movies", movie);
        // return result;

        return 3;
    }

    static async updateMovieByIdFromDB(id, updatedMovie) {
        // let filter = { _id: ObjectId.createFromHexString(id) };
        // let update = { $set: updatedMovie };

        // let result = await mongodbService.updateDocument('movies', filter, update);

        // return result;

        return 4;
    }

    static async deleteMovieFromDB(id) {
        // let filter = { _id: ObjectId.createFromHexString(id) };

        // let result = await mongodbService.deleteDocument('movies', filter);

        // return result;

        return 5;
    }

}


