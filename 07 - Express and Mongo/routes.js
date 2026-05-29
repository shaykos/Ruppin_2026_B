import { Router } from "express";
import moviesRouter from "./features/movies/movies.router.js";

const router = Router();

router.use('/movies', moviesRouter);

export default router;