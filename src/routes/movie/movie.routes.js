import { Router } from "express";
import {
  getAllMovieDetailsById,
  getAllMovies,
} from "../../controllers/movie/movie.controller.js";
import { authenticate } from "../../middlewares/authentic.middleware.js";

const router = Router();

// Get popular movies (paginated)
router.use(authenticate);

router.route("/movie/popular").get(getAllMovies);

// Get movie details
router.route("/movie/:movie_id").get(getAllMovieDetailsById);

export default router;
