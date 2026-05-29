import { ObjectId } from "mongodb";
import dbService from "../../utils/db.service.js";


export default class MoviesMdl {

    static async getAllMoviesFromDB() {
        let result = await dbService.getDocuments("movies");
        return result;
    }

    static async getMovieByIdFromDB(id) {
        let filter = { _id: ObjectId.createFromHexString(id) }
        //let filter = { name: name }

        let result = await dbService.getDocuments("movies", filter);
        return result[0] ?? null;
    }

    static async addMovieToDB(movie) {
        let result = await dbService.insertDocument("movies", movie);
        return result;
    }

    static async updateMovieByIdFromDB(id, updatedMovie) {
        let filter = { _id: ObjectId.createFromHexString(id) };
        let update = { $set: updatedMovie };

        let result = await dbService.updateDocument('movies', filter, update);

        return result;
    }

    static async deleteMovieFromDB(id) {
        let filter = { _id: ObjectId.createFromHexString(id) };

        let result = await dbService.deleteDocument('movies', filter);

        return result;
    }

}


