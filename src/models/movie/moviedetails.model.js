import mongoose, { Schema } from "mongoose";

const movieDetailsSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    poster_path: { type: String, required: true },
    release_date: { type: String },
    runtime: { type: String },
    vote_average: { type: Number },
    genres: [{ name: String }],
    backdrop_path: { type: String },
    tagline: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

export const MovieDetails = mongoose.model("MovieDetails", movieDetailsSchema);
