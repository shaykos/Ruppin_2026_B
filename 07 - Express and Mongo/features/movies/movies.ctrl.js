import { buildErrorResponse, buildSuccessResponse } from '../../utils/response.builder.js';
import MoviesMdl from "./movies.mdl.js";

export async function getAllMovies(req, res) {
    try {
        let result = await MoviesMdl.getAllMoviesFromDB();
        return res.status(200).json(buildSuccessResponse(result));
    } catch (error) {
        return res.status(500).json(buildErrorResponse(error));
    }
}

export async function getSpecificMovie(req, res) {
    try {
        let { id } = req.params;
        let result = await MoviesMdl.getMovieByIdFromDB(id);
        return res.status(200).json(buildSuccessResponse(result));
    } catch (error) {
        return res.status(500).json(buildErrorResponse(error));
    }
}

export async function addMovie(req, res) {
    try {
        let movie = req.body;
        let result = await MoviesMdl.addMovieToDB(movie);
        return res.status(200).json(buildSuccessResponse(result));
    } catch (error) {
        return res.status(500).json(buildErrorResponse(error));
    }
}

export async function updateMovie(req, res) {
    try {
        let { id } = req.params;
        let updateData = req.body;
        let result = await MoviesMdl.updateMovieByIdFromDB(id, updateData);
        return res.status(200).json(buildSuccessResponse(result));
    } catch (error) {
        return res.status(500).json(buildErrorResponse(error));
    }
}

export async function deleteMovie(req, res) {
    try {
        let { id } = req.params;
        let result = await MoviesMdl.deleteMovieFromDB(id);
        return res.status(200).json(buildSuccessResponse(result));
    } catch (error) {
        return res.status(500).json(buildErrorResponse(error));
    }
}

