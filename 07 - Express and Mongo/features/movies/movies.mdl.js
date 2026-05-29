import { ObjectId } from "mongodb";
import DBService from "../../utils/db.service.js";


export default class MoviesMdl {

    static async getAllMoviesFromDB() {
        await DBService.connect();
        let result = await DBService.getDocuments("movies");
        await DBService.disconnect();
        return result;
    }

    static async getMovieByIdFromDB(id) {
        let filter = { _id: ObjectId.createFromHexString(id) }
        //let filter = { name: name }

        await DBService.connect();
        let result = await DBService.getDocuments("movies", filter);
        await DBService.disconnect();
        return result;
    }

    static async addMovieToDB(movie) {
        await DBService.connect();
        let result = await DBService.insertDocument("movies", movie);
        await DBService.disconnect();
        return result;
    }

    static async updateMovieByIdFromDB(id, updatedMovie) {
        let filter = { _id: ObjectId.createFromHexString(id) };
        let update = { $set: updatedMovie };

        await DBService.connect();
        let result = await DBService.updateDocument('movies', filter, update);
        await DBService.disconnect();
        return result;
    }

    static async deleteMovieFromDB(id) {
        let filter = { _id: ObjectId.createFromHexString(id) };

        await DBService.connect();
        let result = await DBService.deleteDocument('movies', filter);
        await DBService.disconnect();
        return result;
    }

}


