import { Movie } from "../../models/movie/movie.model.js";
import { MovieDetails } from "../../models/movie/moviedetails.model.js";

const getAllMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .sort({ popularity: -1 })
      .skip(skip)
      .limit(limit);

    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);

    res.json({
      page,
      results: movies,
      total_pages: totalPages,
      total_results: totalMovies,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllMovieDetailsById = async (req, res) => {
  try {
    const movie = await MovieDetails.findOne({ id: req.params.movie_id });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllMovies, getAllMovieDetailsById };
