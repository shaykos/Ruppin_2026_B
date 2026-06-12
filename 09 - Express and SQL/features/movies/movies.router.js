import { Router } from "express";
import * as ctrl from "./movies.ctrl.js";

const moviesRouter = Router();

moviesRouter
    .get('/list', ctrl.getAllMovies)
    .get('/list/:id', ctrl.getSpecificMovie)
    .post('/add', ctrl.addMovie)
    .put('/update/:id', ctrl.updateMovie)
    .delete('/delete/:id', ctrl.deleteMovie)

export default moviesRouter;
